## streaming 
http://linuxism.tistory.com/1267

## ITU H264 document
https://www.itu.int/rec/T-REC-H.264-201704-I/en

## H264 구성
![Alt text](http://1.bp.blogspot.com/-XoBw_6CfYVc/TsPg6tlJoXI/AAAAAAAAAKQ/XfP2VJeJ6aE/s400/bitstream_detailed.png)
- h.264 확장자의 동영상을 stream analyzer 로 분석하면 
- SPS(Sequence Parameter Set)  -> PPS(H264 Picture parameter Set) -> I Slice -> P Slice -> I Slice -> P Slice 순으로 보인다 

## H264 slice 구성
![Alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/I_P_and_B_frames.svg/500px-I_P_and_B_frames.svg.png)
- I 프레임 : (인트라 코딩 된 사진), JPG 또는 BMP 이미지 파일과 같은 전체 이미지. P 및 B 프레임은 이미지 정보 (프레임간에 변경되는 부분)의 일부만 보유하므로 I- 프레임보다 출력 파일에서 더 적은 공간이 필요합니다.
- P 프레임 : (예측 된 그림)은 이전 프레임의 이미지 변화 만 유지합니다. 예를 들어, 자동차가 고정 된 배경을 가로 질러 움직이는 장면에서는 자동차의 움직임 만 인코딩해야합니다. 인코더는 변하지 않는 배경 픽셀을 P- 프레임에 저장할 필요가 없으므로 공간을 절약 할 수 있습니다. P 프레임은 델타 프레임이라고도합니다.
- B 프레임 (Bidirectional predictive picture)은 현재 프레임과 앞뒤의 프레임 간의 차이를 사용하여 내용을 지정함으로써 훨씬 더 많은 공간을 절약합니다.

## 참고자료
http://gentlelogic.blogspot.kr/2011/11/exploring-h264-part-2-h264-bitstream.html
http://www.tvtechnology.com/multiformat/0112/h/avc-i-and-p-slice-encoding/239473
https://en.wikipedia.org/wiki/Video_compression_picture_types
https://en.wikipedia.org/wiki/Inter_frame

