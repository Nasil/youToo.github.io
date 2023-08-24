

# 방안1
- decorator 를 사용해서 request 전/후 데이터를 로그로 남긴다
- 단, 함수의 변수들이 모두 동일한 위치에 있어야한다는 단점이 있음
```python
def requestlog(fn: Callable):
    """
    API 호출에 대한 로그를 저장하는 데코레이터
    :param fn:
    :return:
    """
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        trace_log = ApiOuterMarketRequestLogSchema.get_instance()
  
        # args[0]은 'url' 값입니다.
        trace_log.request_url = args[0]
        trace_log.request_uri = urlparse(args[0]).path
        trace_log.request_http_method = fn.__name__.upper()  # 함수 이름으로 HTTP 메서드를 설정
  
        if 'header' in kwargs:
            trace_log.request_header = kwargs['header']
        if 'conn_timeout' in kwargs and 'res_timeout' in kwargs:
            trace_log.request_timeout = (kwargs['conn_timeout'], kwargs['res_timeout'])
  
  
        # 실제 함수를 호출하고 응답을 가져옵니다.
        response = fn(*args, **kwargs)
  
        # 응답에 관한 정보를 TraceLog에 저장
        trace_log.response_header = dict(response.headers)
        trace_log.response_status_code = response.status_code
        trace_log.response_body = response.text
        trace_log.log()  # 로그 출력
  
        return response
  
    return wrapper
```
