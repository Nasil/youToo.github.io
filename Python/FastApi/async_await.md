https://fastapi.tiangolo.com/async/

```python
@app.get('/')
async def read_results():
    results = await some_library()
    return results

## 데이터베이스, API, 파일 시스템 등 무언가와 통신하는 타사 라이브러리를 사용 중이고 await 사용을 지원하지 않는 경우(현재 대부분의 데이터베이스 라이브러리가 이에 해당),
## 경로 연산 함수를 정상적으로 선언하고 def만 사용합니다
@app.get('/')
def results():
    results = some_library()
    return results
```

## Asynchronous Code

- coroutines

```python
burgers = await get_burgers(2)

async def get_burgers(number: int):
    # Do some asynchronous stuff to create the burgers
    return burgers
```

- async/sync - non-block/block : https://velog.io/@jjunyjjuny/%EB%8F%99%EA%B8%B0-%EB%B9%84%EB%8F%99%EA%B8%B0-block-non-block
