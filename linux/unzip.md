### gz 
```
gzip -d file.gz
```

### tar
```
tar - xzvf file.tar.gz
```


### zip
```
unzip file.zip
```


### 파일의 압축 풀기

- 소스 패키지를 설치하기 전에 소스 패키지의 압축을 풀어야 합니다. 
- 대부분의 소스 패키지들은 tar.gz 압축이나 tar.bz2 압축으로 되어 있습니다. 
- 먼저 압축을 풀기 전에 적당한 작업디렉토리를 만들어서 복사한후 작업하는 것이 좋습니다. 
- 그 다음에 압축을 풀고 생성된 디렉토리에 들어가서 작업을 진행합니다. tar.gz 압축을 해제하는 방법은 다음과 같습니다. tar.gz 은 tgz 와 같습니다.

#### gzip -d 파일이름.tar.gz | tar xvf - 
#### gzip -d 파일이름.tgz | tar xvf - 
#### tar xvfz 파일이름.tar.gz
또, bzip2로 압축이 되어 있는 경우에도 (이때 확장자는 bz2입니다.)
#### bzip -d 파일이름.tar.bz2 | tar xvf -
#### tar xvfI 파일이름.tar.bz2 (여기서 I는 대문자 i입니다.)
