# Line Detect with v4l2
- This is Line Detect (sobel edge detection) for v4l2 (raspicam).
- Using v4l2 https://linuxtv.org/downloads/v4l-dvb-apis/uapi/v4l/v4l2.html
- You can save pgm original file and line detect output file.
- Adjust setting v4l2 camera
```
frame_count // retry capture
req_width  // cam width
req_height // cam height
req_rate_numerator // bpm 
req_format // format (http://www.thedirks.org/v4l2/v4l2fmt.htm)
```

### raspberry pi setting
- P1 Camera setting
```
sudo raspi-config
>> 5 Interfacing Options => Select
>> P1 Camera => Select
>> Would you like the camera interface to be enabled? => Yes
```
- v4l2 setting
```
sudo modprobe bcm2835-v4l2 // 라즈베리파이 Broadcom
ls /dev/video0 
>> /dev/video0
```

### compile 
- Just type this
```
make all
```
### run
```
./capture
```
