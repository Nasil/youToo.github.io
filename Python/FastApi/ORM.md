# SQLAlchemy
```
pip install sqlalchemy
```

# alembic
- alembic은 SQLAlchemy로 작성한 모델을 기반으로 데이터베이스를 쉽게 관리할 수 있게 도와주는 도구
- 예를들어 models.py 파일에 작성한 모델을 이용하여 테이블을 생성하고 변경할수 있다.

```
pip install alembic
alembic init migrations # alembic.ini 생성됨
alembic revision --autogenerate
alembic upgrade head # 테이블 생성
```

SQLAlchemy 공식 문서: https://docs.sqlalchemy.org/en/14/orm/query.html
