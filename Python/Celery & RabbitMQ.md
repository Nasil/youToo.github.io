# 1. Producer
- celery client 생성 : create tasks

# 2. Broker (RabbitMQ)
- 작업 큐 생성, 일부 라우팅 규칙에 따라 작업 큐에 작업 발송, 작업 큐에서 worker로 작업 전달을 담당

# 3. Consumer (celery worker)
- 작업을 수행하는 하나 이상의 Celery Worker
