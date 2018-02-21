## 1.로직/구간별 실행시간 혹은 네트워크 응답시간(혹은 지연시간=latency)

```
"use strict";

const co = require('co')
const sd = require('stdev')
const axios = require('axios')
const sleep = require('@f/sleep')
const elapsed = require('@f/elapsed-time')

/**
 * Request latency
 */
const latency = co.wrap(function *(url, n) {
  const times = []
  n = n || 50

  for (var i = 0; i < n; i++) {
    var t = elapsed()
    yield axios(url)
    times.push(t())
    yield sleep(30)
  }

  const sigma = sd(times)
  const mu = mean(times)

  return {
    url,
    count: n,
    times,
    mean: mu,
    sd: sigma,
    p95: p95(mu, sigma),
    p99: p99(mu, sigma)
  }
})

function mean (list) {
  return list.reduce((acc, item) => acc + item, 0) / list.length
}

function p95 (mu, sigma) {
  const z = 1.645
  return percentile(z, mu, sigma)
}

function p99 (mu, sigma) {
  const z = 2.326
  return percentile(z, mu, sigma)
}

function percentile (z, mu, sigma) {
  return z * sigma + mu
}
```

## 2. CPU loadavg
동시실행 로직이 많거나 할 땐 CPU loadavg가 중요한 지표가 될 수 있습니다.
loadavg는 대략 아래 문서를 보시면 필요한 내용은 완벽히 숙지가 가능합니다.
http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages
아래는 참고 하시면 좋을 내용
CPU 코어수 계산: https://wiki.simplexi.com/pages/viewpage.action?pageId=630130380
loadavg를 이용한 throttle 예제: http://bloodguy.tistory.com/entry/PHP-load-average-throttle
## 3. Memory
전에 드린 문서 외에 나실님이 따로 공부하신 것 같아 별 말씀은 드릴 게 없을 듯 합니다. ㅎㅎ;
혹시 Rss, Vm, heap 등 메모리 종류별 자세한 내용에 대해 어느게 중요한지 이런 설명이 필요하시면 같이 이야기 해보시지요.
## 4. I/O
일반적인 서비스에선 사실 이게 가장 큰 지연구간이 됩니다.
Disk I/O 병목체크: https://wiki.simplexi.com/pages/viewpage.action?pageId=630130489
Network I/O 는 bandwidth나 socket 수 등 변수가 많아 하나의 수치로 확인할 길은 없습니다.
## 5. 종합 분석
개인적으로 모니터링에 dstat을 가장 선호합니다. 우리 회사 서버에는 거의 다 깔려있음.
블링블링하고 출력내용도 옵션으로 지정가능하고 파이썬으로 플러그인도 직접 제작 가능합니다.
그리고 아래 페이지도 참조해보세요.
https://wiki.simplexi.com/pages/viewpage.action?pageId=786465962
