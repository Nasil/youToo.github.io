## MJPEG란

## 분석
- 일단 MJPEG 가 라즈베리 파이 에서 가능한가 ? 
* v4l2를 사용 하면 가능함 
* raspivid 의 옵션을 주면 가능하다고 함  

- JPEG 로 변환 했을시에 유리한 점은 무엇인가 ? 
* jpeg 로 변환 한다면 각 이미지에 데이터 bitmap 이 담겨 있기 때문에 이미지 처리가 가능함 

- 고민되는 부분은 무엇인가?
* 속도. MPEG -> JPEG -> Bitmat 처리 되는 부분이 오래걸리지 않는가?


## Extract jpeg image data from a mjpeg stream
[ node js ]
https://github.com/kiran-g/node-mjpeg-streamer
ㄴ
https://github.com/mmaelzer/mjpeg-camera
ㄴ
https://github.com/kevinGodell/pipe2jpeg
ㄴ ffmpeg 를 사용 하여 mjpeg 의 스트림된 데이터를 jpg 로 파싱 하는것 


## 참고
[raspi ffmpeg convert]
- http://raspi.tv/2013/how-to-shoot-video-and-convert-it-to-something-you-can-edit-in-pinnacle-and-other-programs
[ node js - v4l2 ]
- https://github.com/npmdoc/node-npmdoc-v4l2camera
[ node js - raspivid mjpeg fs watcher ] 
- https://github.com/john-doherty/raspberry-pi-mjpeg-server/blob/master/raspberry-pi-mjpeg-server.js
[ v4l2 issue ] 
- https://github.com/raspberrypi/linux/issues/849

## Streaming library
- ffmpeg
* https://namu.wiki/w/FFmpeg
* 모든 동영상, 음악, 사진 포맷들의 디코딩과 인코딩을 목표로 만들어지고 있는 LGPL 또는 GPL 라이센스를 따르는 오픈소스 프로젝트. 
* 거의 모든 스트리밍 클라이언트가 ffmpeg 를 사용함

- avconv
* ffmpeg에서 파생된 그룹 
* https://libav.org/avconv.html

## Streaming Client
* GStreamer
* Media Player Classic
* MPEG4IP
* MPlayer
* QuickTime
* RealPlayer
* Skype
* VLC media player
* Winamp
* Windows Media Player
* Xine
* MythTV via Freebox


