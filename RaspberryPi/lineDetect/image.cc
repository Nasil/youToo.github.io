// Class for representing a 2D gray-scale image,
// with support for reading/writing pgm images.
// To be used in Computer Vision class.

#include "image.h"
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <cmath>
#include <vector>

using namespace std;

namespace ComputerVisionProjects {

Image::Image(const Image &an_image){
  AllocateSpaceAndSetSize(an_image.num_rows(), an_image.num_columns());
  SetNumberGrayLevels(an_image.num_gray_levels());

  for (size_t i = 0; i < num_rows(); ++i)
    for (size_t j = 0; j < num_columns(); ++j){
      SetPixel(i,j, an_image.GetPixel(i,j));
    }
}

Image::~Image(){
  DeallocateSpace();
}

void Image::AllocateSpaceAndSetSize(size_t num_rows, size_t num_columns) {
  if (pixels_ != nullptr) DeallocateSpace();
  pixels_ = new int*[num_rows];
  for (size_t i = 0; i < num_rows; ++i)
    pixels_[i] = new int[num_columns];

  num_rows_ = num_rows;
  num_columns_ = num_columns;
}

void Image::DeallocateSpace() {
  for (size_t i = 0; i < num_rows_; i++)
    delete pixels_[i];
  delete pixels_;
  pixels_ = nullptr;
  num_rows_ = 0;
  num_columns_ = 0;
}

bool ReadImage(const string &filename, Image *an_image) {
  if (an_image == nullptr) abort();
  FILE *input = fopen(filename.c_str(),"rb");
  if (input == 0) {
    cout << "ReadImage: Cannot open file" << endl;
    return false;
  }

  // Check for the right "magic number".
  char line[1024];
  if (fread(line, 1, 3, input) != 3 || strncmp(line,"P5\n",3)) {
    fclose(input);
    cout << "ReadImage: Expected .pgm file" << endl;
    return false;
  }

  // Skip comments.
  do
    fgets(line, sizeof line, input);
  while(*line == '#');

  // Read the width and height.
  int num_columns,num_rows;
  
  sscanf(line,"%d %d\n", &num_columns, &num_rows);
  an_image->AllocateSpaceAndSetSize(num_rows, num_columns);


  // Read # of gray levels.
  fgets(line, sizeof line, input);
  int levels;
  sscanf(line,"%d\n", &levels);
  an_image->SetNumberGrayLevels(levels);

  long size = ftell(input);

  // read pixel row by row.
  for (int i = 0; i < num_rows; ++i) {
    for (int j = 0;j < num_columns; ++j) {
      const int byte=fgetc(input);
      if (byte == EOF) {
        fclose(input);
        cout << "ReadImage: short file" << endl;
        return false;
      }
      an_image->SetPixel(i, j, byte);
    }
  }

  fclose(input);
  return true;
}

bool WriteImage(const string &filename, const Image &an_image) {
  FILE *output = fopen(filename.c_str(), "w");
  if (output == 0) {
    cout << "WriteImage: cannot open file" << endl;
    return false;
  }
  const int num_rows = an_image.num_rows();
  const int num_columns = an_image.num_columns();
  const int colors = an_image.num_gray_levels();

  // Write the header.
  fprintf(output, "P5\n"); // Magic number.
  fprintf(output, "#\n");  // Empty comment.
  fprintf(output, "%d %d\n%03d\n", num_columns, num_rows, colors);

  for (int i = 0; i < num_rows; ++i) {
    for (int j = 0; j < num_columns; ++j) {
      const int byte = an_image.GetPixel(i , j);
      if (fputc(byte,output) == EOF) {
	    fclose(output);
            cout << "WriteImage: could not write" << endl;
	    return false;
      }
    }
  }

  fclose(output);
  return true;
}

/**
 * LocateEdges( ) locates edges using sobel derivatives. Sets the color of
 * image based on the gradient approximation of sobel derivatives.
 *
 * @param {Image} an_image: input image
 */
void LocateEdges(Image *an_image){
  // matrix dimensions
  int row = an_image->GetNumberOfRows();
  int column = an_image->GetNumberOfColumns();
  // set senter
  int center_row = row/2;
  int center_column = column/2;
  // sobel operator in x direction
  int sobel_x[3][3] = {{-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1}};
  // sobel operator in y direction
  int sobel_y[3][3] = {{-1, -2, -1}, {0, 0, 0}, {1, 2, 1}};
  int image_x[row][column];
  int image_y[row][column];
  for (int i = 0; i < row; ++i) {
    for (int j = 0; j < column; ++j) {
      // https://stackoverflow.com/questions/16385570/sobel-edge-detector-using-c-without-any-special-library-or-tool
      int pixel = 0;
      int x_convolution = 0;
      int y_convolution = 0;
      // x and y convolutions
      for (int x = -1; x <= 1; x++){
        for (int y = -1; y <= 1; y++){
          pixel = (i == 0 || i == row-1 || j == 0 || j == column-1) ? 0 : an_image->GetPixel(i+x, j+y);
          x_convolution = x_convolution + (pixel * sobel_x[1+x][1+y]);
          y_convolution = y_convolution + (pixel * sobel_y[1+x][1+y]);
        }
      }
      image_x[i][j] = x_convolution;
      image_y[i][j] = y_convolution;
    }
  }


    int min_point = 40;
    int max_point = 90;

  // gradient approximation
  for (int i = 0; i < row; ++i) {
    int point1 = 0;
    int point2 = 0;
    for (int j = 0; j < column; ++j) {
      double gradient_approximation = sqrt(image_x[i][j]*image_x[i][j] + image_y[i][j]*image_y[i][j]);
      
      // Set Point
      if (gradient_approximation > 150) {
        if (point1 == 0) {
            point1 = j;
        } else {
            if (j - point1 > 10) {
                point2 = j;
            }
        }
      }

      // Set Color
      an_image->SetPixel(i,j,gradient_approximation);
    }
    
    //int diff1 = center_column - point1;
    //int diff2 = point2 - center_column;

	//if (i < center_row && i > center_row/2) {
    //	if (diff1 < min_point && diff2 > max_point) {
	//		cout << "[AGV] Turn Left : " << diff1 << ", " << diff2  << endl;
	//    } else if (diff1 > max_point && diff2 < min_point) {
	//		cout << "[AGV] Turn Right : " << diff1 << ", " << diff2  << endl;
    //	}
	//} 

  }
  
  // Set center
  an_image->SetPixel(center_row, center_column, 255);
}


}  // namespace ComputerVisionProjects
