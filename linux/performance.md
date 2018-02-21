1. 로직/구간별 실행시간 혹은 네트워크 응답시간(혹은 지연시간=latency)
- 샘플실행 후 단순 min/max보다 좀 더 정밀한 값을 알고 계시는게 좋습니다.
- 최빈값 기준으로 최다구간을 평균으로 표시하거나, 90% 혹은 95%, 99% 구간의 실행시간 등을 함께 보는 식.
- 어차피 잘 돌아가는건 궁금하지 않고 최악의 상황일 때의 실행시간이 중요할 수도 있고, 어떤 데이터가 중요한지에 따라 체크해야 할 값이 다르긴 합니다.
- 딱히 아름답게 정리된 문서를 찾지 못했습니다만, p99 latency 같은 걸로 보시면 대략 감이 오실겁니다.

2. CPU loadavg
- 동시실행 로직이 많거나 할 땐 CPU loadavg가 중요한 지표가 될 수 있습니다.
- loadavg는 대략 아래 문서를 보시면 필요한 내용은 완벽히 숙지가 가능합니다.
- http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages
- 아래는 참고 하시면 좋을 내용
- CPU 코어수 계산: https://wiki.simplexi.com/pages/viewpage.action?pageId=630130380
- loadavg를 이용한 throttle 예제: http://bloodguy.tistory.com/entry/PHP-load-average-throttle

3. Memory

4. I/O
- 일반적인 서비스에선 사실 이게 가장 큰 지연구간이 됩니다.
- Disk I/O 병목체크: https://wiki.simplexi.com/pages/viewpage.action?pageId=630130489
- Network I/O 는 bandwidth나 socket 수 등 변수가 많아 하나의 수치로 확인할 길은 없습니다.

5. 종합 분석
- 개인적으로 모니터링에 dstat을 가장 선호합니다. 우리 회사 서버에는 거의 다 깔려있음.
- 블링블링하고 출력내용도 옵션으로 지정가능하고 파이썬으로 플러그인도 직접 제작 가능합니다.
- 그리고 아래 페이지도 참조해보세요.
- http://techblog.netflix.com/2015/11/linux-performance-analysis-in-60s.html
