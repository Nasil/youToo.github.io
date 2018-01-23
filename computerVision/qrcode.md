# QRcode 원리

#### http://aishack.in/tutorials/scanning-qr-codes-1/

## QR 코드의 해부학


![Image of Yaktocat](http://aishack.in/static/img/tut/qr-intro.jpg)

QR 코드는 네 개의 주요 부분으로 구성된다 :

QR Code는 매트릭스 형 심볼 체계의 2차원 심볼이며, 정방형에 배치된 셀로 이루어져 있다. 인식률을 향상시키기   위한 기능 패턴과 데이터를 나타내는 데이터 영역으로 구성되어 있다.

QR Code는, Finding Pattern, Alignment Pattern, Timing Pattern, Quite Zone 등의 패턴이 있다.

1. Finding Pattern
QR Code의 위치를 검출하기 위한 심볼이다. 심볼의 세 개의 정점에 배치하는 것으로써, 심볼의 위치, 크기, 기울임도 검출할 수 있다.Finding Pattern 심볼은 360°전 방향으로 검출 이 가능한 구조로 되어 있다.

2. Alignment Pattern
패턴 심볼의 훼손을 보정하기 위한 패턴.특히 비선형 훼손을 보정하는데 효율적이다. 얼라이먼트 패턴 의 중심 좌표를  요구하고, 심볼 훼손을 보정한다. 이 때문에, 얼라이먼트 패턴에 흑색의 고립 셀을 배치해, 중심 좌표를 검출하기 쉬운 구조로 되어 있다.

3. Timing Pattern
각 셀의 중심 좌표를 요구하는 패턴으로, 흑, 백의 패턴이 교대로 배치되어 있다.심볼이 훼손되어있거나 , 셀 피치에  오차가 생겼을 경우, 데이터 셀의 중심 좌표를 보정하기 위해서 이용된다.세로 방향과 가로방향의 2 방향으로 배치되어 있다.

4. Quiet Zone
실제로 심볼을 인식할 때 필요하게 되는 여백 스페이스이다. 이 콰이어트 존에 의해, 심볼의 경계가 검출하기 쉬워진다. 덧붙여 QR 코드의 경우는,4 셀 이상을 필요로 한다.

5. 데이터 영역
데이터는 이 영역에서 코드화 된다. 그림5.3-1의 회색 부분이 데이터 영역이다. 데이터는, 규칙에 근거해‘０＇과‘１＇의 ２종류로 부호화되어, 흑/백 의 셀로 변환해 심볼에 배치한다. 데이터 영역에는, 입력 데이터와 오류 정정 기능인  리드 솔로몬 부호가 배치되어 있다.

## QR 코드 탐지하는 방법

QR 코드를 탐지를 파인더 패턴을 식별 중심으로 돌아 가지. 핵심 아이디어는 수의 비율이 있다는 것입니다 블랙 / 화이트 / 블랙 / 화이트 / 블랙. 그리고이 비율에 상관없이 당신이 그것을 보면 어떤 각도 그대로 유지합니다. <br/>

위의 그림에서는 QR 코드 파인더 패턴의 해부학, 당신은 레드 라인의 각이 거의 같은 비율을 가지고 것을 볼 수 있습니다. 이 각도에 의존하지 않습니다. 당신이 그런 비율을 '확인'하면, 당신은 무엇을 당신이 보는 것은 파인더 패턴인지 확인해야합니다. 당신은 수평 및 수직 축을 따라 선택하여이 작업을 수행. 이 같은 비율이라면, 당신은 당신이 파인더 패턴을 발견했습니다 알고있다. 당신이 3 개 파인더 패턴이 있으면, 모든 것이 상대적으로 간단하다. 당신은 QR 코드를 추출하고 관점을 수정. 그런 다음 각 비트를 추출하고 데이터가 무엇을 의미하는지 알아낼 수 있습니다.  <br/>

## 오류 수정

QR 코드는 실제로 될 수있다. 그들은 '희생'이 더 많이 보이게 할 데이터의 몇 비트 수 있습니다. 그들은 희생 비트를 보상하기 위해 비트의 중복 복사본을 저장합니다. 물론, 이것은 전체 용량을 감소 -하지만 코드가 좋은 모양 아직도 모든 스캐너로 읽을 수 있습니다. QR은이 작업을 수행하기 위해 리드 - 솔로몬 에러 정정 코드를 사용합니다. 이 에러 정정 다중 '수준'(7 %, 15 %, 25 %, 30 %)을 지원한다. 비트의 30 %가 손상된 경우 (오염, 세척 기술로 대체, 퇴색) 당신은 여전히 QR '읽을'수 있습니다.  <br/>


## QR code decode

1. grayscale image
검정색 또는 흰색 픽셀 만 남겨 두도록 회색조 비트 값으로 변환합니다.

```javascript
grayscale = function(imageData) {
  var ret = new Array(imageData.width * imageData.height);

  for (var y = 0; y < imageData.height; y++) {
    for (var x = 0; x < imageData.width; x++) {
      var gray = this.getPixel(imageData, x, y);

      ret[x + y * imageData.width] = gray;
    }
  }

  return {
    height: imageData.height,
    width: imageData.width,
    data: ret
  };
};

getPixel = function(imageData, x, y) {
  if (imageData.width < x) {
    throw "point error";
  }
  if (imageData.height < y) {
    throw "point error";
  }
  var point = (x * 4) + (y * imageData.width * 4);
  return (imageData.data[point] * 33 + imageData.data[point + 1] * 34 + imageData.data[point + 2] * 33) / 100;
};


```
