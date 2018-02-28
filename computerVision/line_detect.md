## Line Detection


#### Hough Transformation
- http://sams.epaiai.com/220588392347
- https://blog.naver.com/dusrb2003/220290145675
- http://makeshare.org/bbs/board.php?bo_table=raspberrypi&wr_id=10

![Alt text](http://makeshare.org/data/editor/1602/cba7d75088069cd02a9535379e0eb2c0_1456722596_4368.gif)<br/><br/>
![Alt text](http://makeshare.org/data/editor/1602/cba7d75088069cd02a9535379e0eb2c0_1456722611_1638.png)<br/><br/>
- 한점 (a1, b1) 을 기준으로 직선을 반시계 방향으로 돌리면서 거리와(r) 과 각도(θ)의 값(r1, θ1)을 기록합니다. 
- 그리고 또 다른 한점 (a2, b2) 를 기준으로 같은 방식으로 (r2, θ2)을 기록합니다. 
- 이렇게 하다보면 같은 지점이 만나는 점이 나오는데 그것이 우리가 찾고자 하는 교차 점이 됩니다. 
- 그 교차점을 이어서 직선을 유추할수가 있습니다.
![Alt text](http://makeshare.org/data/editor/1602/cba7d75088069cd02a9535379e0eb2c0_1456722635_9798.png)<br/><br/>
![Alt text](http://makeshare.org/data/editor/1602/cba7d75088069cd02a9535379e0eb2c0_1456722650_8469.png)<br/><br/>


- 차선 검출 예제 :
https://github.com/HyOsori/Osori-SelfDrivingWithGTA5/wiki/%EA%B0%95%EC%A2%8C-6---OpenCV%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%B0%A8%EC%84%A0-%EA%B2%80%EC%B6%9C
