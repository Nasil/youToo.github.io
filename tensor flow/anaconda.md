## Anaconda 란?
- https://gzupark.github.io/articles/Why-Anaconda-How-to-control-Anaconda/


## Anaconda 설치 
- 기존에 파이썬이 있는경우 파이썬 삭제 먼저 해야함
- 설치 후 Anaconda Prompt 실행
```
// conda update
> conda update -n base conda
// python update
> conda update --all
// pip update
> python -m pip install --upgrade pip

// tensorflow를 위한 아나콘다 가상실행환경 만들기
> conda create --name tensorflow python=3.5
> activate tensorflow
> conda install jupyter
> conda install scipy
> conda install nb_conda
> pip install tensorflow-gpu // only cpu -> pip install tensorflow

// jupyter 
> jupyter notebook
```
- 텐서플로우 설치 되어 있는지 확인
```
In [1]: import tensorflow as tf
In [2]: 
hello = tf.constant("hello tensorflow")
sess = tf.Session()
print(sess.run(hello))
```

- 참조 : https://steemit.com/it/@sukjunko/38ndhz-sj
