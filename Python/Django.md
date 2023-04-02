# Django


## django 시작하기

- 설치
```
pip install django
pip install djangorestframework
django-admin --version
```
- 패키지 생성
```
django-admin startproject myproject // 패키지 생성
./manage.py startapp myapp // 앱 만들기 -> INSTALLED_APPS 에 
./manage.py createsuperuser // 유저 셋팅
```
- 가상환경 실행
```
$ python3 -m venv env
$ source env/bin/activate
$ python manage.py makemigrations // DB 파일 생성
$ python manage.py migrate // DB 반영
$ python manage.py runserver // 서버 실행
```
- 서브 폴더 생성
```
mkdir apps/myapp
python manage.py startapp myapp  apps/myapp
```

- 쉘
```
python manage.py shell
>>> from elections.models import Candidate
>>> Candidate.objects.all()
<QuerySet [<Candidate: test>, <Candidate: mandy>]>
>>> new_candidate = Candidate(name="루루")
>>> Candidate.objects.all()
<QuerySet [<Candidate: test>, <Candidate: mandy>]>
>>> new_candidate.save()
>>> Candidate.objects.all()
<QuerySet [<Candidate: test>, <Candidate: mandy>, <Candidate: 루루>]>
```

```
phtyon3 -m venv env
source env/bin/activate
pip install -r ./xxx.txt
python3 ./manage.py runserver
```

## MVT 패턴
![img](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpdQ3m%2FbtqwhTpC3gU%2FvXB2IGfXViX7cGFQgXjlR1%2Fimg.png)
- 장고 프레임워크에서는 View를 Template, Controller는 View라고 표현하며, MVC를 MVT 패턴이라고 한다.
- Model(데이터) - models.py
- View(화면) - templates // 화면에 어떤 장면을 보여줄지를 결정
- Controller(조율) - views
    - Django에서는 controller(조율)를 views.py에서 담당하고, View(화면)를 templates에서 담당합니다. 헷갈리지 않게 주의하세요.

## 장고에서 URL을 분석하는 순서
- 웹 클라이언트가 웹 서버에 페이지 요청시, 장고에서 URL을 분석하는 순서를 간단히 요약하면 아래와 같다.
1. setting.py 파일의 ROOT_URLCONF 항목을 읽어 최상위 URLconf (urls.py)의 위치를 알아낸다.
2. URLconf를 로딩하여 urlpatterns 변수에 지정되어있는 URL 리스트를 검사한다.
3. 위에서부터 순서대로 URL 리스트의 내용을 검사하면서 URL 패턴이 매치되면 검사를 종료한다.
4. 매치된 URL의 뷰를 호출한다. 여기서 뷰는 함수 또는 클래스의 메소드다. 호출시 HttpRequest 객체와 매칭할 때 추출된 단어들을 뷰에 인자로 넘겨준다.
5. URL 리스트 끝까지 검사했는데도 매칭에 실패하면 에러를 처리하는 뷰를 호출한다.
