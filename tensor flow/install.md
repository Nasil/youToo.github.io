
#mac 에서 tensorflow 설치 방법

1. Homebrew
- http://brew.sh/index_ko.html

2. Install python
- brew install python

3. Check if you are using system python
```
  $ which python
  //If output is /usr/local/bin/python then skip to step 4.
```
4. Install a python at user level using Homebrew:
```
  $ brew install python
  $ brew linkapps python
  $ which python
  /usr/local/bin/python
```
5. Install or update pip using easy_install:
```
  $ easy_install pip
  $ pip install --upgrade pip
```
6. Install TensorFlow:
```
  $ pip install tensorflow
  $ pip install tensorflow-gpu # Optional
```
7. Test the installation by loading tensorflow in a python console:
```
  $ python
  >>> import tensorflow as tf
```

https://github.com/mokpro/tensorflow_examples/blob/master/README.md

