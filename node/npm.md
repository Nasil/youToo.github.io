## 설치 관련
- npm init은 package.json을 만드는 명령어였죠? 새로운 프로젝트나 패키지를 만들 때 사용합니다.
- npm install은 이미 아시다시피 패키지를 설치하는 명령어입니다. npm install 패키지@버전하면 특정한 버전을 설치할 수 있고, npm install 주소하면 특정한 저장소에 있는 패키지를 설치할 수 있습니다. 주소는 주로 Github에만 있는 패키지를 설치할 때 사용합니다. 옵션을 줄 수 있는데 뒤에 --save 또는 -S를 하면 dependencies에(npm5부터는 --save옵션이 기본적으로 설정되어 있기 때문에 안 붙여도 됩니다), --save-dev 또는 -D하면 devDependencies에 추가됩니다. 그리고 -g를 하면 글로벌 패키지에 추가됩니다. 글로벌 패키지에 추가하면 이 프로젝트뿐만 아니라 다른 프로젝트도 해당 패키지를 사용할 수 있습니다.
- npm update는 설치한 패키지를 업데이트하는 명령어입니다.
- npm dedupe는 npm의 중복된 패키지들을 정리할 때 사용합니다. 가끔 쳐주면 용량도 줄이고 좋습니다.
- npm docs는 패키지에 대한 설명을 보여줍니다. 하지만 그냥 npm 홈페이지에 가서 보는 게 정신 건강에 좋습니다.

## 조회 관련
- npm root는 node_modules의 위치를 알려줍니다.
- npm outdated는 오래된 패키지가 있는지 알려줍니다. 오래되었고 package.json에 적어둔 버전 범위와 일치하면 빨간색으로, 오래되었지만 버전 범위와 일치하지 않으면 노란색으로 표시됩니다.
- npm ls는 패키지를 조회하는 명령어입니다. 현재 설치된 패키지의 버전과 dependencies를 트리 구조로 표현합니다. npm ll을 하면 더 자세한 정보를 줍니다. npm ls [패키지명]을 하면 해당 패키지가 있는지와, 해당 패키지가 어떤 패키지의 dependencies인지 보여줍니다.
- npm search는 npm 저장소에서 패키지를 검색하는 명령어입니다. 패키지의 이름, 설명 또는 키워드를 바탕으로 검색 결과가 나옵니다. 그냥 npm 홈페이지에서 검색하는 게 정신 건강에 좋습니다.
- npm owner는 패키지의 주인이 누군지 알려주는 명령어입니다. 또는 여러 명의 주인을 설정하거나 지울 수 있습니다.
- npm bugs는 버그가 발생했을 때 어떻게 패키지의 주인에게 연락을 취할지 알려줍니다. 주로 Github의 issues 탭을 엽니다.

## 로그인 관련
- npm adduser은 npm에 회원가입하는 명령어입니다. 로그인도 됩니다. npm login도 똑같은 역할을 합니다.
- npm logout은 반대로 logout할 때 사용합니다.
- npm whoami는 귀여운 명령어입니다. 이름 그대로 내가 누군지 물어보는 명령어죠. 로그인한 상태라면 자신의 아이디를 알려줍니다.

## 출시 관련
- npm publish는 패키지를 직접 출시하거나 버전 업그레이드를 할 때 사용하는 명령어입니다. .gitignore또는 .npmignore 파일에 적혀있지 않은 파일들은 npm 저장소에 업로드되어 출시됩니다. 여러분도 이제 자신의 패키지를 가질 수 있는거죠. 이 명령어를 사용하려면 여러분은 로그인한 상태여야 합니다. 그리고 패키지의 이름은 선점하는 사람이 계속 쓰기 때문에 이름을 선점하는 것도 중요합니다.
- npm deprecate는 이미 낸 패키지를 사용하지 않도록 권고하는 명령어입니다. 자신이 어떤 버전을 출시했는데 치명적인 버그가 있다면 이 명령어를 사용해서 다른 사람들에게 사용하지 말도록 말해줍시다.
- npm unpublish는 publish한 패키지를 다시 unpublish하는 겁니다. 하지만 deprecate를 쓰는 게 나은 게 이미 자신의 패키지를 다운로드한 사람들에게 피해를 입힐 수 있습니다.
- npm star는 자신이 좋아하는 패키지를 표시하는 기능입니다. 이 star이 많을 수록 인기 패키지이기도 합니다. 심심하시면 제 react-vote나 react-filepicker에 star 해보세요.
- npm starts는 특정 사람이 star한 패키지 목록을 확인할 수 있습니다.
- npm version은 버전 업데이트를 할 때 사용합니다. 새로운 버전이 나왔다면 npm version [버전]하면 됩니다.

## 실행 관련
- npm start은 package.json의 scripts에 있는 start 명령어를 실행하는 부분입니다. 만약 start 명령어를 따로 설정하지 않았다면 node server.js가 실행됩니다.
- npm stop은 뭔지 알겠죠? npm start했던 것을 멈추는 명령어입니다.
- npm restart은 npm stop 후에 다시 npm start를 하는 명령어입니다.
- npm test는 test 명령어를 실행합니다.
- npm run은 그 이외의 scripts를 실행하는 명령어입니다. 예를 들어 scripts에 build 명령어가 있다하면, npm run build하면 됩니다.

## 설정 관련
- npm cache는 npm 내의 cache를 보여줍니다. 만약 npm에 문제가 생기거나 하면 제일 먼저 하는 게 npm cache clean으로 cache를 지우는 겁니다.
- npm rebuild는 npm을 다시 설치하는 명령어입니다. 에러가 발생했을 시 주로 npm cache clean을 한 후 이 명령어를 쳐서 재설치해봅니다.
- npm config는 npm의 설정을 조작하는 명령어입니다. npm config list 하면 현재 설정들을 볼 수 있고, npm set [이름] [값], npm get [이름]으로 속성을 설정하거나 조회할 수 있습니다.
