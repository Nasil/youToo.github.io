
# 라즈베리파이 초기 설정 
- https://github.com/Nasil/youToo.github.io/blob/master/RaspberryPi/setting_first.md

# 스마트 미러 설정
- https://github.com/evancohen/smart-mirror
- http://bluexmas.tistory.com/573
- http://forums.rasplay.org/topic/336/%EC%8A%A4%EB%A7%88%ED%8A%B8%EB%AF%B8%EB%9F%AC-%EC%9E%91%ED%92%88%EC%A4%91-%EC%9D%8C%EC%84%B1%EC%9D%B8%EC%8B%9D-%EB%AC%B8%EC%A0%9C%EC%9E%85%EB%8B%88%EB%8B%A4-%E3%85%A0%E3%85%A0/8
- http://bluexmas.tistory.com/573

## 에러 나는 부분 따로 설치 
``` 
// git clone 후에 설치 프로그램
npm install --unsafe-perm
// snowboy 설치  
npm install nan snowboy
// bower 설치
$ npm config set prefix /usr/local
$ npm install -g bower
$ which bower
>> /usr/local/bin/bower
$ bower -v
>> 1.8.4
$ cd smart-mirror
$ bower install —allow-root
```
- https://stackoverflow.com/questions/42308879/npm-err-code-elifecycle?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

# keyfile.json
- https://github.com/google/google-auth-library-nodejs/issues/137

```
sudo -i
```

# 구글 스피치
- http://jeongchul.tistory.com/544

# 마이크설정
- http://www.g7smy.co.uk/2013/08/recording-sound-on-the-raspberry-pi/
- http://jeongchul.tistory.com/542
```
// 설정후 마이크 볼륨을 켜줘야함
alsamixer 
```

# 유튜브 설정
```
plugins/search/config.schema.json
"key": {
    "type": "string",
    "title": "YouTube API Key"
}
```

# 한글 설정
- https://cloud.google.com/speech-to-text/docs/languages

# wifi 설정
- http://webnautes.tistory.com/903
