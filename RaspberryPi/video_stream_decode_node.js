# https://www.raspberrypi.org/documentation/raspbian/applications/camera.md
# https://www.npmjs.com/package/raspivid
# https://www.npmjs.com/package/raspivid-stream

# 라즈베리파이에서 제공하는 카메라 관련 응용 프로그램은 raspistill, raspivid, raspistillyuv 이 있다.
# 모든 응용 프로그램은 명령 줄에서 구동되며 OpenMAX를 통해 실행되는 MMAL API를 활용하도록 작성되었습니다. 
# MMAL API는 OpenMAX가 제공하는 것보다 사용하기 쉬운 시스템을 제공합니다. 
# MMAL은 Videocore 4 시스템에서만 사용되는 Broadcom 관련 API입니다. (bcm2835-v4l2)

# 이 응용 프로그램은 카메라, 미리보기, 인코더 및 null_sink와 같은 최대 4 개의 OpenMAX (MMAL) 구성 요소를 사용합니다. 
# 모든 응용 프로그램은 카메라 구성 요소를 사용합니다. 
# raspistill은 Image Encode 구성 요소를 사용합니다. 
# raspivid는 Video Encode 구성 요소를 사용합니다. 
# raspistillyuv는 인코더를 사용하지 않고 YUV 또는 RGB 출력을 카메라 구성 요소에서 직접 파일로 보냅니다.

# 라즈베리파이 카메라 사용 방법
# >> sudo raspi-config 
# >> camera 설정

# 이소스는 raspivid 를 이용하여 비디오 영상의 스트림된 각 프레임을 h.264 로 디코딩을 합니다 
# 추후 디코딩한 데이터를 가지고 영상 변환을 할 것입니다 

'use strict'

const child = require('child_process')
const Splitter = require('stream-split');
const stream = require('stream');
const StreamConcat = require('stream-concat');

const NALseparator = new Buffer([0,0,0,1]);

const headerData = {
    _waitingStream: new stream.PassThrough(),
    _firstFrames: [],
    _lastIdrFrame: null,

    set idrFrame(frame) {
        this._lastIdrFrame = frame;

        if (this._waitingStream) {
            const waitingStream = this._waitingStream;
            this._waitingStream = null;
            this.getStream().pipe(waitingStream);
        }
    },

    addParameterFrame: function (frame) {
        this._firstFrames.push(frame)
    },

    getStream: function () {
        if (this._waitingStream) {
            return this._waitingStream;
        } else {
            const headersStream = new stream.PassThrough();
            this._firstFrames.forEach((frame) => headersStream.push(frame));
            headersStream.push(this._lastIdrFrame);
            headersStream.end();
            return headersStream;
        }
    }
};


function videoOn(options) {
  options = options || {};

  var args = [];

  Object.keys(options || {}).forEach(function(key){
    args.push('--' + key);
    var val = options[key];
    if (val || val === 0) {
      args.push(val);
    }
  })

  args.push('-o')
  args.push('-')

  // the avconv stream that inherits stderr
  var video_process = child.spawn('raspivid', args, {
    stdio: ['ignore', 'pipe', 'inherit']
  });

  return video_process.stdout;
}


function setLiveStream(options) {
	return videoOn(options)
    .pipe(new Splitter(NALseparator))
    .pipe(new stream.Transform({ transform: function (chunk, encoding, callback) {
        const chunkWithSeparator = Buffer.concat([NALseparator, chunk]);

        const chunkType = chunk[0] & 0b11111;

        // Capture the first SPS & PPS frames, so we can send stream parameters on connect.
        if (chunkType === 7 || chunkType === 8) {
            headerData.addParameterFrame(chunkWithSeparator);
        } else {
            // The live stream only includes the non-parameter chunks
            this.push(chunkWithSeparator);

            // Keep track of the latest IDR chunk, so we can start clients off with a near-current image
            if (chunkType === 5) {
                headerData.idrFrame = chunkWithSeparator;
            }
        }

        callback();
    }}));
}


var liveStream = null;

function liveStreaming(options) {
    liveStream = setLiveStream(options);

    return new StreamConcat([headerData.getStream(), liveStream]);
}

var options = {
    width: 320,
    height: 240,
    framerate: 20, // 2~30
    profile: 'baseline', // H264
    timeout: 0
};

liveStreaming(options).on('data', (data) => {
    console.log(data);
});
