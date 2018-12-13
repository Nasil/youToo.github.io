## API 문서화 작업

- 문서화 작업을 하기 위하여 무슨 것을 쓸까 (wiki, 메모장, Mkdocs 등등) 고민하다가 외부 공유가 가능하며 실시간 수정 반영 되는 것으로 선정하였다
- 주소 : https://www.mkdocs.org/


### 설치 방법 (window & linux)
- 파이썬이 설치 되어 있어야한다.
```
pip install mkdocs // mkdocs 다운로드
mkdocs new api-docs // 폴더 생성
cd api-docs // 생성한 폴더로 이동
mkdocs serve // 서비스 시작
mkdocs build // 빌드
```

### 구조 (mkdocs.yml)
```
site_name: Scrape Hub Api
theme: readthedocs
pages:
  - 홈: index.md
  - 로그인 API:
    - '로그인': 'account/login.md'
  - 상품 API:
    - '상품 등록': 'product/register.md'
    - '상품 조회': 'product/view.md'
  - 주문 API:
    - '주문 수집': 'order/register.md'
```
