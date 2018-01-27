
## Setting camera
- 방법1 : raspi-config 사용
```
raspi-config
Interfacing Options
Camera
enable
```
- 방법2 : vi로 셋팅
```
vi /boot/config.txt

// 맨밑에 추가
start_x=1
gpu_mem=128
```

## Setting bcm2835-v4l2
```
sudo modprobe bcm2835-v4l2 // set v4l2
grep "bcm2835-v4l2" /etc/modules || echo "bcm2835-v4l2" >> /etc/modules // set for reboot 
ls /dev/video0 // check
```

