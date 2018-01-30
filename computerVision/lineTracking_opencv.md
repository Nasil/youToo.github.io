## 1. 라즈베리파이에 opencv 설치 
- 참고자료 : http://webnautes.tistory.com/916
- 최신버전 : https://docs.opencv.org/3.4.0/
- node opencv (opencv가 설치되어 있어야 함) : https://github.com/peterbraden/node-opencv
- 주의 ) 설치하는데 거의 2~3시간 걸림, 메모리 부족할수 있으니 처음 설치 전에 확인해야함

## 2. 라즈베리파이 카메라 이용해서 open cv 출력하기
- v4l2 드라이버를 사용하는게 어렵기 때문에 라즈베리파이 카메라 드라이버를 사용할수 있는 라이브러리 (raspicam_cv) 이용 
####2-1. 라즈베리파이 제어를 위해 C++ 라이브러리 raspicam을 이용
####2-2. 라즈베리파이 카메라 모듈을 인식시켜주는 카메라 디바이스 모듈을 커널에 로드시켜 /dev/video0 디바이스 파일 생성

// raspicam 설치
```
pi@raspberrypi:~ $ wget https://downloads.sourceforge.net/project/raspicam/raspicam-0.1.6.zip
pi@raspberrypi:~ $ unzip raspicam-0.1.6.zip
pi@raspberrypi:~ $ cd raspicam-0.1.6
pi@raspberrypi:~/raspicam-0.1.6 $ mkdir build
pi@raspberrypi:~/raspicam-0.1.6 $ cd build
pi@raspberrypi:~/raspicam-0.1.6/build $ cmake ..
```
// 성공했으면
```
pi@raspberrypi:~/raspicam-0.1.6/build $ make && sudo make install
pi@raspberrypi:~/raspicam-0.1.6/build $ sudo ldconfig
```
// 필요없는 데이터 삭제
```
pi@raspberrypi:~/raspicam-0.1.6/build $ cd
pi@raspberrypi:~ $ rm -rf raspicam*
```
// 확인 
```
pi@raspberrypi:ls /usr/local/lib/libraspicam_cv.so
```

#### 2-3. 실제 테스트해보기 (opencv + raspicam)
// 테스트폴더 생성
```
mkdir raspicam
cd raspicam
vi main.cpp
```
// main.cpp 에 아래소스 입력
```
#include <iostream>
#include <raspicam/raspicam_cv.h>
#include <opencv2/imgproc.hpp>
#include <opencv2/opencv.hpp>
  
using namespace std;
using namespace cv;

 
int main ( int argc,char **argv ) {
 
    raspicam::RaspiCam_Cv Camera;
    cv::Mat frame;
 
    Camera.set( CV_CAP_PROP_FORMAT, CV_8UC3);
    Camera.set( CV_CAP_PROP_FRAME_WIDTH, 640 );
    Camera.set( CV_CAP_PROP_FRAME_HEIGHT, 480);
 
 
    if (!Camera.open()) {cerr<<"Error opening the camera"<<endl;return -1;}
 

    //파일로 동영상을 저장하기 위한 준비
    cv::VideoWriter outputVideo;
    cv::Size frameSize(640,480);
    int fps = 25;
 
    outputVideo.open("output.avi", cv::VideoWriter::fourcc('X','V','I','D'), fps, frameSize, true);
    if (!outputVideo.isOpened())
    {
        cout  << "Could not open the output video for write: " << "output.avi" << endl;
        return -1;
    }
 
    while(1){
        Camera.grab();
        Camera.retrieve ( image);
 
        //cvtColor(image, image, cv::COLOR_BGR2RGB);
 
        outputVideo.write(image);
 
        imshow( "picamera test", image );
        if ( waitKey(20) == 27 ) break; //ESC키 누르면 종료
    }
 
    Camera.release();
	return 0;
}
```

// CMakeLists 작성
```
// CMakeLists.txt

cmake_minimum_required (VERSION 2.8) 
 
set(CMAKE_MODULE_PATH "/usr/local/lib/cmake/${CMAKE_MODULE_PATH}") 
find_package(raspicam REQUIRED)
find_package(OpenCV)
 
add_executable (main main.cpp)  
target_link_libraries (main ${raspicam_CV_LIBS})
```
// 컴파일
```
pi@raspberrypi:~/raspicam $ mkdir build
pi@raspberrypi:~/raspicam$ cd build
pi@raspberrypi:~/raspicam/build $ cmake ..
pi@raspberrypi:~/raspicam/build $ make
```
// 컴파일 성공후 실행파일 실행
```
pi@raspberrypi:~/raspicam/build $ ./main
```



## 3.  Line Follower opencv 

- Open cv 를 사용한 다양한 방식이 있음 
- https://github.com/abaeyens/image-processing/tree/master/RCJ_2014
 -> C++, 라인 트랙을 따라서 동그라미 4개가 라인 사이즈 및 가운데 점을 찾고 벗어나는 점을 찾아가는 방법
- https://github.com/CRM-UAM/VisionRace 
 -> 파이썬, 라인 트랙을 따라서 4개로 split 한다음 가운데 점을 찍고 그 위치가 화면에서 벗어났는지 확인하는 방법
- https://github.com/tgilmour94/ros_amr
 -> C++, canny & Houghtrasform  사용함 가장 전형적인 방법, 라인을 먼저 잡고 가운데 점을 포인트로 잡아서 화면을 따라가는 방식. 제일 구현이 쉬운듯

