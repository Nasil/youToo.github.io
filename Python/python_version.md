## 버전업그레이드
```
brew update
pyenv install --list
pyenv install 3.11.2

pyenv versions
pyenv global 3.11.2
```

## 파이썬 설치 경로
```
which python
which -a python
which -a python3
```

## 파이썬 가상환경으로 실행
```
python3 -m venv env
source env/bin/activate
pip install -r ./requirements.txt 
python3 ./manage.py runserver
```
