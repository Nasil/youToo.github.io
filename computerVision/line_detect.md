## Line Detection
- BGR to Gray -> Canny Edge Detection -> 가우시안 정규화 -> 관심영역 필터링 -> 허프 직선검출 -> 차선 검출 -> 차선 그리기


## 1. Edge Detection 알고리즘
종류 | 장단점
| ---------- | ------------------------------------|
소벨 | 모든 방향의 에지를 추출<br> 돌출한 화소값을 비교적 평균화하므로 잡음에 강한 편<br> 수직/수평 에지보다 대각선 방향 에지에 더 민감하게 반응
프리윗 | 소벨, 프리윗에 비해 매우 빠른 계산 속도<br> 주변과 관계없이 경계가 확실한 에지를 추출<br> 마스크의 크기가 작아 돌출한 화소값을 평균화 할 수 없으므로 잡음 해결 불가
로버츠 마스크 | 소벨, 프리윗에 비해 매우 빠른 계산 속도<br> 주변과 관계없이 경계가 확실한 에지를 추출<br> 마스크의 크기가 작아 돌출한 화소값을 평균화 할 수 없으므로 잡음 해결 불가
캐니 엣지 | 위의 엣지 검출 알고리즘들보다 가장 우월하다고함<br> 에러율이 낮음 (모든 엣지 검출)<br> 검출된 엣지의 중심 거리가 작음 (명확하고 선명한 선을 찾아냄)<br> 구현이 복잡하고 실행시간이 길다 (임계값 기울기 방법을 사용)

#### 소벨 엣지
```javascript
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
````

#### Hough Transformation
- http://sams.epaiai.com/220588392347
- https://blog.naver.com/dusrb2003/220290145675
- http://makeshare.org/bbs/board.php?bo_table=raspberrypi&wr_id=10

![Alt text](http://makeshare.org/data/editor/1602/cba7d75088069cd02a9535379e0eb2c0_1456722596_4368.gif)<br/><br/>
- 한점 (a1, b1) 을 기준으로 직선을 반시계 방향으로 돌리면서 거리와(r) 과 각도(θ)의 값(r1, θ1)을 기록합니다.
- 그리고 또 다른 한점 (a2, b2) 를 기준으로 같은 방식으로 (r2, θ2)을 기록합니다.
- 이렇게 하다보면 같은 지점이 만나는 점이 나오는데 그것이 우리가 찾고자 하는 교차 점이 됩니다.
- 그 교차점을 이어서 직선을 유추할수가 있습니다.
![Alt text](http://makeshare.org/data/editor/1602/cba7d75088069cd02a9535379e0eb2c0_1456722611_1638.png)<br/><br/>
![Alt text](http://makeshare.org/data/editor/1602/cba7d75088069cd02a9535379e0eb2c0_1456722635_9798.png)<br/><br/>
![Alt text](http://makeshare.org/data/editor/1602/cba7d75088069cd02a9535379e0eb2c0_1456722650_8469.png)<br/><br/>


- C++ Hough Transformation Example
    - https://github.com/HyOsori/Osori-SelfDrivingWithGTA5/wiki/%EA%B0%95%EC%A2%8C-6---OpenCV%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%B0%A8%EC%84%A0-%EA%B2%80%EC%B6%9C



