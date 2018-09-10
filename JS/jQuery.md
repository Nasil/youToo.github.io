

## Virtual DOM ? 
- http://mygumi.tistory.com/190
- https://www.youtube.com/watch?v=BYbgopx44vo
- https://medium.com/js-dojo/whats-new-in-vue-js-2-0-virtual-dom-dc4b5b827f40


## Why Removing jQuery
- https://githubengineering.com/removing-jquery-from-github-frontend/
- https://www.tokyobranch.net/archives/6598
- https://www.zerocho.com/category/jQuery/post/57b356d4d841141500b31e1e

#### JS 역사 
- 1990년대 : Netscape과 IE의 DOM구조가 완전히 달랐기 때문에 하나의 기능을 위해서 두번의 스크립트 개발이 필요했습니다. 
- 2003 ~ 2005년대 : Netscape가 망하고 2003년도 전후로 Windows XP와 IE6가 유일해졌음. Web 2.0의 유행을 타고 2005년 전후로 다양한 javascript 프레임웍이 출현. Netscape의 후신인 파이어폭스가 2004년 말에 출시 (fireBug 등 최신 기술이 있어서 개발자들이 좋아함). 
- 2006 ~ 2007년대 : IE와 파폭은 DOM 구조가 달랐고, 기존의 프레임웍으로는 모듈화 하기가 쉽지 않았는데 jQuery가 등장. DOM을 추상화해서 관리해 주는데다, 깔끔한 플러그인 방식을 지원했기 때문에 jQuery는 나오자마자 선풍적인 인기를 끔.

#### jQuery 단점
- jQuery를 사용할 때 getElementById보다 10배 느린 것을 볼 수 있습니다. querySelector보다는 다섯 배 느리고요. 이렇게 느린 속도가 조금씩 누적되다보면 상당한 차이를 야기할 수도 있습니다.
- 1.x버전과 2.x버전은 공식적으로 소프트웨어로서의 수명을 다했습니다. IE6~8을 지원하려면 1.x를 써야 하는데 그렇게 되면 차후의 서포트를 받지 못하게 됩니다. IE9부터는 jQuery 3.x에서 지원하므로 당분간은 문제가 없을 예정입니다만 IE9, 10지원을 포기하면 수많은 대안이 존재합니다.
- jQuery Deferred는 하위호환때문에 Promise/A+ 표준을 지키지 않습니다. Ajax도 fetch라는 표준이 나와서 굳이 jQuery방식을 쓸 필요가 없구요. 
- jQuery의 hide, show는 element에 style을 적용합니다. < div style=”display:none” >처럼요. 그런데 element의 style은 우선도가 높기에 css에서 설정한게 안먹을 수도 있습니다. 그러므로 가급적 쓰면 안됩니다만 어디에고 그런 설명을 찾기는 어렵습니다.
