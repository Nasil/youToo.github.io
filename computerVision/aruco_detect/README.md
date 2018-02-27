## How to ArUco Detect
1. Locator 
- Find 4 corner location
2. Extractor
- Extract marker bitmap
3. Decoder
- Decode ArUco angle and data with hamming distance

## TEST 
- Test with pgm files or binary files

## Bug 
- It does not recognize well when the angle is 45 degrees.
- You can adjust when you read the middle bits in the Extractor.
 
## latency
- 

## Resources
#### ArUco detect
- http://webnautes.tistory.com/1040
- https://docs.opencv.org/3.1.0/d5/dae/tutorial_aruco_detection.html
- http://iplimage.com/blog/approach-encodedecode-black-white-marker/
- http://iplimage.com/blog/create-markers-aruco/
- https://en.wikipedia.org/wiki/Hamming(7,4) → 에러 확인 해밍코드
#### ArUco Generator 
- http://bhollis.github.io/aruco-marker/demos/angular.html
- http://terpconnect.umd.edu/~jwelsh12/enes100/markergen.html
- http://diogok.net/js-aruco-markers/index.html
- https://github.com/diogok/js-aruco-markers
#### Aruco source 
- https://github.com/buildar/awe.js/
- https://github.com/jcmellado/js-aruco
- https://github.com/jcmellado/js-aruco/blob/master/src/aruco.js (GOOD :) 
- http://sourceforge.net/projects/opencvlibrary/
- http://incubator.quasimondo.com/processing/fast_blur_deluxe.php
 

 
 
