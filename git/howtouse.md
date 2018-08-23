
# 사용방법 
참고 : https://rogerdudler.github.io/git-guide/index.ko.html

- 로컬 저장소를 복제(clone)하려면 아래 명령을 실행하세요.
```
git clone /로컬/저장소/경로
git clone 사용자명@호스트:/원격/저장소/경로
```

- 파일 추가
```
git add <파일 이름>
```

- 로컬에 커밋 (로컬 저장소의 HEAD)
```
git commit -m "이번 확정본에 대한 설명"
```

- 원격저장소에 반영
```
git push origin master
```


- 가지치기 ("feature_x"라는 이름의 가지를 만들고 갈아탑니다.)
```
git checkout -b feature_x
```

- 아래 명령으로 master 가지로 돌아올 수 있어요.
```
git checkout master
```

- 아래 명령으로는 가지를 삭제할 수 있어요.
```
git branch -d feature_x
```

- 가지를 원격 저장소에 올립니다
```
git push origin <가지 이름>
```

- 원격저장소에 있는 것을 갱신합니다
- 이렇게 하면 원격 저장소의 변경 내용이 로컬 작업 디렉토리에 받아지고(fetch), 병합(merge)된답니다.
```
git pull
```

다른 가지에 있는 변경 내용을 현재 가지(예를 들면, master 가지)에 병합하려면 아래 명령을 실행하세요.
```
git merge <가지 이름>
```
