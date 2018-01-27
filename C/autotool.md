## Install

1. m4 install
```
wget -O m4-1.4.9.tar.gz http://ftp.gnu.org/gnu/m4/m4-1.4.9.tar.gz
tar -zvxf m4-1.4.9.tar.gz
cd m4-1.4.9
./configure
make
make install
```

2. autoconf install
```
wget -c 'http://ftp.gnu.org/gnu/autoconf/autoconf-2.69.tar.gz'
tar xzvf autoconf-2.69.tar.gz
cd autoconf-2.69
./configure
make && sudo make install
```

3. automake install
```
wget -c 'http://ftp.gnu.org/gnu/automake/automake-1.14.1.tar.gz'
tar xzvf automake-1.14.1.tar.gz
cd automake-1.14.1
./configure
make && sudo make install
```

4. libtool install
```
wget -c 'http://ftp.gnu.org/gnu/libtool/libtool-2.4.2.tar.gz'
tar xzvf libtool-2.4.2.tar.gz
cd libtool-2.4.2
./configure
make && sudo make install
```

## 사용법

1. Makefile.am 작성
```
$ autoscan
$ mv configure.scan configure.ac
```
2. configure.ac 수정
```
AC_INIT([FULL-PACKAGE-NAME], [VERSION], [BUG-REPORT-ADDRESS])
-> AC_INIT(Zbar, 1, aaa@naver.com)
```
3.
```
libtoolize --force
aclocal
autoheader
automake --force-missing --add-missing
autoconf
./configure
make
make install
```

### 그외 
- make 시 오류들 : https://wiki.kldp.org/KoreanDoc/html/GNU-Make/GNU-Make-8.html
