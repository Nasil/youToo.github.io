
#mac 에서 tensorflow 설치 방법

1. Homebrew
- http://brew.sh/index_ko.html

2. Check if you are using system python
```
  $ which python
  //If output is /usr/local/bin/python then skip to step 4.
```
3. Install a python at user level using Homebrew:
```
  $ brew install python
  $ brew linkapps python
  $ which python
  /usr/local/bin/python
```
4. Install or update pip using easy_install:
```
  $ easy_install pip
  $ pip install --upgrade pip
```
5. Install TensorFlow:
```
  $ pip install tensorflow
  $ pip install tensorflow-gpu # Optional
```
6. Test the installation by loading tensorflow in a python console:
```
  $ python
  >>> import tensorflow as tf
```

https://github.com/mokpro/tensorflow_examples/blob/master/README.md

