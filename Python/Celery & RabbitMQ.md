# 1. Producer
- celery client 생성 : create tasks

# 2. Broker (RabbitMQ)
- 작업 큐 생성, 일부 라우팅 규칙에 따라 작업 큐에 작업 발송, 작업 큐에서 worker로 작업 전달을 담당

# 3. Consumer (celery worker)
- 작업을 수행하는 하나 이상의 Celery Worker


Fast API 사용법
```python
from fastapi import FastAPI
from celery_worker import divide

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/work")
async def work(task_id: str, input_a: int, input_b: int):
    divide.apply_async([input_a, input_b], task_id=task_id)
    return {"message": "celery start"}

@app.get("/work_result")
async def work_result(task_id: str):
    result = divide.AsyncResult(task_id)
    return {"message": result.info}
```
