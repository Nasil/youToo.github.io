# github 시작하기
1. git 저장소 만들기 (web)
2. 소스가 있는 폴더에 가서
3. git init
4. git remote add origin (저장소 url)
5. git remote -v // 확인하기
6. git pull origin master
   - 에러나면 : git pull origin branchname --allow-unrelated-histories
7. git push origin master
8. git branch -v  // 현재 브랜치 확인
9. git pull origin <branch name> 


# 로컬에있는 것을 git 에 올리기
1. git init // 로컬 파일에 git 설정
2. git add *  // 파일 추가
3. git commit -m 'start' // 커밋
4. git checkout master // 마스터 브랜치
5. git branch // 현재 브랜치 확인  
6. git pull origin master // github 가서 확인시 브랜치가 main 이면 master 로 변경 후 실행
7. git push origin master // readme 생성시 에러 발생하면 git push -u origin +master
8. git clone git://주소
9. git fetch upstream // 최신 업데이트를 가져옴
10. git checkout master
11. git merge upstream/master // upstream repository 의 master branch (혹은 원하는 branch) 로부터 나의 local master branch 로 merge 한다.
12. git push origin master // master 브랜치를 `origin' 서버에 Push


- git remote add origin https://github.com/Nasil/ReactSimple  -> 저장소를 github 가서 미리 만들어야 한다
- git remote -v // 확인하기
- git remote remove origin // origin 리포지토리 제거


# 기타
- https://developer0809.tistory.com/148
- Personal access tokens : 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
- 처음 인증키 username 은 Nasil
