## download

1. m4 install
````
wget -O m4-1.4.9.tar.gz http://ftp.gnu.org/gnu/m4/m4-1.4.9.tar.gz
tar -zvxf m4-1.4.9.tar.gz
cd m4-1.4.9
./configure
make
make install
````

2. autoconf install
```
wget -c 'http://ftp.gnu.org/gnu/autoconf/autoconf-2.69.tar.gz'
tar xzvf autoconf-2.69.tar.gz
cd autoconf-2.69
./configure
make && sudo make install
````

3. automake install
````
wget -c 'http://ftp.gnu.org/gnu/automake/automake-1.14.1.tar.gz'
tar xzvf automake-1.14.1.tar.gz
cd automake-1.14.1
./configure
make && sudo make install
````

4. libtool install
````
wget -c 'http://ftp.gnu.org/gnu/libtool/libtool-2.4.2.tar.gz'
tar xzvf libtool-2.4.2.tar.gz
cd libtool-2.4.2
./configure
make && sudo make install
````
```
