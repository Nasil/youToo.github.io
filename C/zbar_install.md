1. Zbar install
```
*note: depends=('imagemagick' 'libxv' 'python2' 'gtk2' 'qt4' 'pygtk' 'v4l-utils') (apply for archlinux, use proper package with other distro. Something linke libv4l-devel alter v4l-utils)
get package:
wget http://downloads.sourceforge.net/project/zbar/zbar/0.10/zbar-0.10.tar.bz2

tar xvf zbar-0.10.tar.bz2 
cd zbar-0.10

sudo apt-get install libv4l-dev
sudo ln -s /usr/include/libv4l1-videodev.h   /usr/include/linux/videodev.h

sudo apt-get install libperl-dev
sudo apt-get install libgtk2.0-dev


./configure --prefix=/usr --without-imagemagick --without-qt --without-gtk --without-python --without-java CFLAGS=-DNDEBUG
make
make install
```

2. imagemagick install
```
https://www.imagemagick.org/download/ImageMagick.tar.gz
tar xvzf ImageMagick.tar.gz
cd ImageMagick-7.0.7-22
./configure
make
make install
sudo ldconfig /usr/local/lib
/usr/local/bin/convert logo: logo.gif
make check
```
https://www.imagemagick.org/script/install-source.php


3. qt4 install
- http://webnautes.tistory.com/1120
