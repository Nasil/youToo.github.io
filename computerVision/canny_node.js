```
"use strict";

var SOBEL_X_FILTER = [[-1, 0, 1],
                        [-2, 0, 2],
                        [-1, 0, 1]];
var SOBEL_Y_FILTER = [[1, 2, 1],
                        [0, 0, 0],
                        [-1, -2, -1]];
var ROBERTS_X_FILTER = [[1, 0],
                        [0, -1]];
var ROBERTS_Y_FILTER = [[0, 1],
                        [-1, 0]];
var PREWITT_X_FILTER = [[-1, 0, 1],
                        [-1, 0, 1],
                        [-1, 0, 1]];
var PREWITT_Y_FILTER = [[-1, -1, -1],
                        [0, 0, 0],
                        [1, 1, 1]];

function gradient(frame, column, row) {
    console.time('Sobel Filter Time');

    var image_x = new Uint8ClampedArray(column * row);
    var image_y = new Uint8ClampedArray(column * row);

    for (var i = 0; i < row; i++) {
      for (var j = 0; j < column; j++) {
        let pixel = 0;
        let x_convolution = 0;
        let y_convolution = 0;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <=1; y++) {
                pixel = (i == 0 || i == row-1 || j == 0 || j == column-1) ? 0 : frame[(i+x) * column + (j+y)];
                x_convolution = x_convolution + (pixel * SOBEL_X_FILTER[1+x][1+y]);
                y_convolution = y_convolution + (pixel * SOBEL_Y_FILTER[1+x][1+y]);
            }
        }
        image_x[i * column + j] = x_convolution;
        image_y[i * column + j] = y_convolution;
      }
    }

    for (let i = 0; i < row; ++i) {
        for (let j = 0; j < column; ++j) {
            let imagex = image_x[i * column + j];
            let imagey = image_y[i * column + j];
            let gradient_approximation = Math.sqrt(imagex * imagex + imagey * imagey);
            frame[i * column + j] = gradient_approximation;
        }
    }
    console.timeEnd('Sobel Filter Time');

    return frame;
};


exports.gradient = gradient;
```
                                
