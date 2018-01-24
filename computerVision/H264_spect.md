## Streaming 
(kor ver.) http://linuxism.tistory.com/1267

## ITU H264 document
https://www.itu.int/rec/T-REC-H.264-201704-I/en

## H264 구성
![Alt text](http://1.bp.blogspot.com/-XoBw_6CfYVc/TsPg6tlJoXI/AAAAAAAAAKQ/XfP2VJeJ6aE/s400/bitstream_detailed.png)
- h.264 확장자의 동영상을 stream analyzer 로 분석하면 
- SPS(Sequence Parameter Set)  -> PPS(H264 Picture parameter Set) -> I Slice -> P Slice -> I Slice -> P Slice 순으로 보인다 
- 슬라이스 헤더에는 슬라이스 유형, 슬라이스의 매크로 블록 유형, 슬라이스 프레임의 번호에 대한 정보가 들어 있습니다. 또한 헤더에는 참조 프레임 설정 및 수량화 매개 변수에 대한 정보가 들어 있습니다. 그리고 마침내 슬라이스 데이터(매크로 블록) 여기가 픽셀이 숨어있는 곳입니다.

## 메크로블록
![Alt text](http://1.bp.blogspot.com/-kTrtXc7xxDQ/TsPh6nctEYI/AAAAAAAAAKc/dyScSoiZtXs/s400/macroblock.png)
- 매크로 블록은 개별 픽셀에 해당하는 휘도 및 색차 성분 집합을 포함하기 때문에 정보의 주요 전달자입니다. 
- 세부 사항은 밝히지 않고, 비디오 디코딩은 휘도 및 색차 성분의 도움으로 픽셀 색상의 후속 복구로 비트 스트림에서 매크로 블록의 검색 및 검색으로 궁극적으로 축소된다는 결론을 내릴 수 있습니다. 다음은 단일 매크로 블록의 모습입니다.

# NAL(Network Abstraction Layer) Unit
![Alt text](http://postfiles2.naver.net/data32/2008/3/12/33/h_264_stream_onlyou_4ever.jpg?type=w3)

- NAL Unit 의 시작 패턴 
* 3bytes start pattern : 00000000 00000000 000000XX
* 4bytes start pattern : 00000000 00000000 00000011 000000XX
* 4bytes start pattern : 00000000 00000000 00000000 000000XX
- ex) raspberry camera로 raspivid 로 촬영을 해보니 '00 00 00 01' ALUN 이 분석 되었다.

![Alt text](https://i.stack.imgur.com/9XEy4.png)
## H264 slice 구성
![Alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/I_P_and_B_frames.svg/500px-I_P_and_B_frames.svg.png)
- I 프레임 : (인트라 코딩 된 사진), JPG 또는 BMP 이미지 파일과 같은 전체 이미지. P 및 B 프레임은 이미지 정보 (프레임간에 변경되는 부분)의 일부만 보유하므로 I- 프레임보다 출력 파일에서 더 적은 공간이 필요합니다.
- P 프레임 : (예측 된 그림)은 이전 프레임의 이미지 변화 만 유지합니다. 예를 들어, 자동차가 고정 된 배경을 가로 질러 움직이는 장면에서는 자동차의 움직임 만 인코딩해야합니다. 인코더는 변하지 않는 배경 픽셀을 P- 프레임에 저장할 필요가 없으므로 공간을 절약 할 수 있습니다. P 프레임은 델타 프레임이라고도합니다.
- B 프레임 (Bidirectional predictive picture)은 현재 프레임과 앞뒤의 프레임 간의 차이를 사용하여 내용을 지정함으로써 훨씬 더 많은 공간을 절약합니다.

## GOP
![Alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/IBBPBB_inter_frame_group_of_pictures.svg/350px-IBBPBB_inter_frame_group_of_pictures.svg.png)

- 일반적인 GOP (Group of Pictures) 구조는 IBBPBBP ... I- 프레임은 첫 번째 P- 프레임을 예측하는 데 사용되며이 두 프레임은 또한 첫 번째 및 두 번째 B- 프레임을 예측하는 데 사용됩니다. 두 번째 P- 프레임은 또한 첫 번째 I- 프레임을 사용하여 예측됩니다. 두 P- 프레임은 함께 결합하여 세 번째 및 네 번째 B- 프레임을 예측합니다. 그 계획은 다음 그림에 나와 있습니다.

- 이 구조는 두 번째 및 세 번째 (B- 프레임)를 예측하기 위해 네 번째 프레임 (P- 프레임)이 필요하기 때문에 문제가 있음을 나타냅니다. 따라서 B 프레임 전에 P 프레임을 전송해야하므로 전송이 지연됩니다 (P 프레임을 유지해야 할 필요가 있음). 이 구조에는 다음과 같은 장점이 있습니다.

- 가능한 커버리지 영역의 문제를 최소화합니다.
P 프레임과 B 프레임은 I 프레임보다 적은 데이터를 필요로하므로 전송되는 데이터가 적습니다.
그러나 약점이있다.

- 그것은 디코더의 복잡성을 증가 시키므로 프레임을 재정렬하기 위해 더 많은 메모리가 필요합니다.
보간 된 프레임들 (즉, B- 프레임들)은 증가 된 비트율을 의미하는 더 많은 모션 벡터들을 요구한다.

## 참고자료
http://gentlelogic.blogspot.kr/2011/11/exploring-h264-part-2-h264-bitstream.html
http://www.tvtechnology.com/multiformat/0112/h/avc-i-and-p-slice-encoding/239473
https://en.wikipedia.org/wiki/Video_compression_picture_types
https://en.wikipedia.org/wiki/Inter_frame
http://blog.naver.com/PostView.nhn?blogId=onlyou_4ever&logNo=40048828597&from=search
