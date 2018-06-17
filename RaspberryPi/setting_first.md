// 초기 계정정보로 로그인
// pi : raspberry
// pi 계정은 어차피 삭제할 예정이므로 건드리지 않음
```
//  root 비밀번호 설정
sudo passwd root
// root 로그인
su -
```

---------------------------------------------------------------

# 초기 설정 
```
sudo apt-config 
```
- passwd 변경 
- 카메라 on
- ssh on

# 로케일 설정

I1 Change Locale
    * en_US.UTF-8 UTF-8
    * ko_KR.UTF-8 UTF-8
    * default는 en_US.UTF-8
I2 Change Timezone
    * Asia/Seoul
I3 Change Keyboard Layout
    * Generic 105-key (Intl) PC
    * Other > Korean > Korean - Korean (101/104 key compatible)
    * Key to function as AltGr: The default for the keyboard layout
    * Compose key: No compose key

- 여기까지 완료 후 Finish > 재부팅
---------------------------------------------------------------

- 재부팅 후 root 로 로그인 하고
- 설정 세팅
```
cp -a /etc/skel/.??* ~/
source ~/.bashrc
```
---------------------------------------------------------------
# pi 계정말고 다른 계정 추가 (옵션)
```
// test 계정 추가
adduser test
// visudo로 test 추가
test ALL=(ALL:ALL) ALL  
// ssh 설정
// /etc/ssh/sshd_config에 아래 내용 추가
PermitRootLogin no
// pi 계정 삭제
userdel -r pi
```
---------------------------------------------------------------
# 업그레이드 
``
apt-get update && apt-get -y upgrade && apt-get dist-upgrade -y
apt-get autoremove && apt-get autoclean && apt-get clean
```
---------------------------------------------------------------
#  애드온 매니저 설치
```
apt-get install vim-addon-manager -y

vi /root/.myvimrc
// /root/.myvimrc 파일을 만들어서 아래 내용으로 저장 후

set nocompatible
set bs=indent,eol,start
set history=50
set ruler
set bg=dark
set backspace=2
set autoindent
set nobackup
set novisualbell
set nojoinspaces
set tabstop=4
set et
set shiftwidth=4
set keywordprg=edic
set showcmd
set incsearch
set autowrite
set hls
set enc=utf8
     
if has("syntax")
    syntax on
endif
     
if &term=="xterm"
    set t_Co=8
    set t_Sb=^[[4%dm
    set t_Sf=^[[3%dm
endif

 // /root/.bashrc에 alias vi='vi -u ~/.myvimrc' 라인 추가

```
---------------------------------------------------------------
# 시간 동기화 
```
// ntpdate 설치
apt-get install ntpdate -y
// 일단 한 번 맞추고
ntpdate -u 3.kr.pool.ntp.org
// cron에 추가해서 주기적으로 맞추자
0 * * * * /usr/sbin/ntpdate -u 3.kr.pool.ntp.org > /dev/null 2>&1
```

---------------------------------------------------------------
# git 설치 


---------------------------------------------------------------
#  x-window 설치 
```
// https://www.raspberrypi.org/forums/viewtopic.php?t=133691
apt-get install --no-install-recommends xserver-xorg xinit -y
apt-get install raspberrypi-ui-mods -y
// 재부팅
// 재부팅 완료 후 한글입력을 위한 패키지 설치
// X-window의 터미널에서 (터미널 여는 단축키는 ctrl+alt+T)
```

# 폰트 
- 개발용이므로 마음에 드는걸로 하거나 안해도 상관없음
```
apt-get install fonts-nanum-coding -y
```

# uim 설치
```
apt-get install fonts-unfonts-core uim uim-byeoru -y
// uim 설치 완료 후
시작메뉴 > Preferences > Input Method
OK
Yes
uim 선택 > OK
OK
// 재부팅
//재부팅 완료 후 
// 우측상단의 블루투스 아이콘 좌측에 - <-  모양의 아이콘이 있음. - 모양의 아이콘 우클릭 > Preference
// Global settings > Input method deployment 에서 Specify default IM 체크
// Default input method를 Byeoru 로 변경
// 여기까지 하고 OK 버튼 눌러서 창을 닫으면 shift + space로 한영 변환
// 한영키로 한영변환을 하고 싶다면 아래 설정 추가
Byeoru key bindings 1 > [Byeoru] on > Edit
Key: 부분을 클릭한 후 한영키 누름 > Add > Close
[Byeoru] off 도 동일하게
// 한자변환은 F9가 기본값인데 한자키로 변환하고 싶다면 아래 설정 추가
Byeoru key bindings 1 > [Byeoru] convert Hangul to Chinese characters > Edit
Key: 부분을 클릭한 후 한자키 누름 > Add > Close
OK 버튼 클릭하면 설정 완료
```

# 시스템 폰트 수정
- 메뉴 > Preferences > Appearance Settings > System > Font 에서 NanumGothicCoding 선택
- 터미널은 termit 이란 걸 쓰는데 기본 폰트 설정을 하려면 아래처럼.
```
mkdir -p ~/.config/termit
vi ~/.config/termit/rc.lua
// rc.lua 파일은 이렇게 하고 저장. 이후 termit 실행시 아래 설정을 따름.
defaults = {}
defaults.font = 'NanumGothicCoding'
setOptions(defaults)
```
---------------------------------------------------------------
# chromium-browser 설치
```
apt-get install chromium-browser -y 
// 확인
chromium-browser --version
```
---------------------------------------------------------------
# node 설치 
```
// 아래 페이지로 가서 ARMv7 최신버전 링크를 알아내서 wget으로 받으면 됨.
// https://nodejs.org/en/download/
    
mkdir -p /home/apps/src
mkdir -p /home/apps/nodejs
cd /home/apps/src
wget --no-check-certificate https://nodejs.org/dist/v8.9.1/node-v8.9.1-linux-armv7l.tar.xz
    
xz -d node-v8.9.1-linux-armv7l.tar.xz
tar xf node-v8.9.1-linux-armv7l.tar
   
mv node-v8.9.1-linux-armv7l/* /home/apps/nodejs/
rm -rf /home/apps/src/*
cd /usr/local/bin
ln -s /home/apps/nodejs/bin/node node
ln -s /home/apps/nodejs/bin/npm npm
 
// 확인
node --version
```
---------------------------------------------------------------
# 마우스 
```
// 마우스 커서를 숨겨주는 unclutter 설치
apt-get install unclutter -y
```

---------------------------------------------------------------

# Rotate your monitor
- To rotate your monitor you'll need to add the following line to /boot/config.txt using the following command sudo nano /boot/config.txt
```
display_rotate=1
```
---------------------------------------------------------------
# Disable screensaver and remove panel
```
vi /home/pi/.config/lxsession/LXDE-pi/autostart

- Reccomended To disable the screensaver you'll want to comment out (with a '#') the @xscreensaver. You'll also want to add the following lines to that same file

@xset s off
@xset -dpms
@xset s noblank
- Optional To remove the panel at the top of the screen to comment out the @lxpanel lines. If you want to be able to easily access the "menu" at the top of the screen do not do this step.
```
---------------------------------------------------------------

# Audio Output
- Should you want to change the output from AUX (headphone jack) to HDMI or back again you can run the following:
```
// To output audio through the headphone jack:
amixer cset numid=3 1
// To force the audio back through HDMI you can run:
amixer cset numid=3 2
```
---------------------------------------------------------------

# 패키지 저장소 정리
```
apt-get autoremove
apt-get autoclean
apt-get clean
```
# 전원 내리기
```
poweroff
```

# 기타 
- 외부 IP 접속 : http://ict-nroo.tistory.com/7
