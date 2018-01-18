# 영상처리와 색상 모델

![Image of Yaktocat](http://cfile8.uf.tistory.com/image/017E584E5199F0A4369042)

## Gray
모델은 색(color) 정보를 사용하지 않고 밝기 정보만으로 영상을 표현하는 것이다. 검정색 0부터 흰색 255까지 총 256단계의 밝기값(intensity)으로 영상 픽셀값을 표현한다.

## RGB
RGB 모델은 가장 기본적인 색상모델로서 색(color)을 Red, Green, Blue의 3가지 성분의 조합으로 생각하는 것이다. </br>
RGB 모델에서 검은색은 R=G=B=0, 흰색은 R=G=B=255, 빨강색은 R=255, G=B=0, 노란색은 R=G=255, B=0로 표현된다. </br>
R=G=B인 경우는 무채색인 Gray 색상이 된다. R, G, B 각각은 0 ~ 255 사이의 값을 가질 수 있기 때문에 RGB 색상 모델을 사용하면 총 256*256*256 = 16,777,216가지의 색을 표현할 수 있다.

## HSV
HSV 모델은 Hue(색조), Saturation(채도), Value(명도)의 3가지 성분으로 색을 표현한다. </br>
 * Hue는 색조(예: 붉은색 계열인지 푸른색 계열인지, ...)
 * Saturation은 그 색이 얼마나 선명한(순수한) 색인지
 * Value는 밝기(intensity)를 나타낸다.
HSV 모델은 우리가 색을 가장 직관적으로 표현할 수 있는 모델이며 또한 머리속에서 상상하는 색을 가장 쉽게 만들어낼 수 있는 모델이다. </br>
영상처리/영상인식에서 HSV 모델을 사용할 때, H, S, V 각각은 0 ~ 255 사이의 값으로 표현된다. </br>
H 값은 색의 종류를 나타내기 때문에 크기는 의미가 없으며 단순한 인덱스(index)를 나타낸다. </br>
S 값은 0이면 무채색(gray 색), 255면 가장 선명한(순수한) 색임을 나타낸다. </br>
V 값은 작을수록 어둡고 클수록 밝은 색임을 나타낸다. </br>
HSV 색상 모델은 그림과 같이 원뿔(conic) 형태, 원기둥(cylindric) 형태가 있다.

## yCbCr(=YUV)
RGB 색에서 밝기 성분(Y)와 색차 정보 (Cb, Cr)를 분리하여 표현하는 색상 모델이다 </br>
디지철 영상에서 Y, Cb, Cr은 각각 0~255 사이의 값을 가진다. </br>
YCbCr 모델은 mpeg 에서 사용 되는 색상 모델이다. </br>
인간의 눈이 밝기 차에는 민감하지만 색차에는 상대적으로 둔감하다는 점을 이용해 Y에는 많은 비트수(해상도)를 할당하고, CbCr에는 낮은 비트수를 할당하는 방식으로 압축하는것이 mpeg 이다. </br>


## 예제
차선 인식 문제를 살펴보자. 차선은 크게 흰색 차선과 노란색 차선이 존재한다. </br>
흰색 차선의 경우에는 밝기 정보를 이용하는 것이 효과적이겠지만 흰색이 무채색이라는 것도 중요한 정보가 될 것이다. </br> 
가령, HSV 모델을 사용한다고 했을 때, 흰색 차선은 V > t1 이면서 S < t2인 조건을 만족시키도록 찾을 수 있을 것이다. </br>
노란 차선의 경우에는 밝기정보를 제거하고 순수 색 정보를 이용하는 것이 좋을 것이다. 하지만 밝기가 어두우면 색 정보가 불안해지기 때문에 밝기가 일정한 값 이상이면서 순수 색 값이 노란색과 유사한 색을 찾으면 될 것이다 (HSV 모델의 경우, V>t1 이고 S>t2 이면서 H는 노란색의 H와 유사한 색).

## 변환
```cpp
//RGB<->Gray
gray = (299*R + 587*G + 114*B)/1000    (R,G,B 별로 밝기가 다름을 반영한 것임)
R = G = B = gray
```

```cpp
//YCbCr<->RGB
Y = (299*R + 587*G + 114*B)/1000
Cb = 0.5643*(B - Y) + 128
Cr = 0.7132*(R - Y) + 128
R = (1000*Y + 1402*(Cr-128))/1000
G = (1000*Y - 714*(Cr-128) - 334(Cb-128))/1000
B = (1000*Y + 1772*(Cb-128))/1000
```

```cpp
//HSV<->RGB
#define MATH_MIN3(x,y,z)        ( (y) <= (z) ? ((x) <= (y) ? (x) : (y)) : ((x) <= (z) ? (x) : (z)) )
#define MATH_MAX3(x,y,z)        ( (y) >= (z) ? ((x) >= (y) ? (x) : (y)) : ((x) >= (z) ? (x) : (z)) )

struct hsv_color {
    unsigned char h;        // Hue: 0 ~ 255 (red:0, gree: 85, blue: 171)
    unsigned char s;        // Saturation: 0 ~ 255
    unsigned char v;        // Value: 0 ~ 255
};

hsv_color RGB2HSV(unsigned char r, unsigned char g, unsigned char b)
{
    unsigned char rgb_min, rgb_max;
    rgb_min = MATH_MIN3(b, g, r);
    rgb_max = MATH_MAX3(b, g, r);

    hsv_color hsv;
    hsv.v = rgb_max;
    if (hsv.v == 0) {
        hsv.h = hsv.s = 0;
        return hsv;
    }

    hsv.s = 255*(rgb_max - rgb_min)/hsv.v;
    if (hsv.s == 0) {
        hsv.h = 0;
        return hsv;
    }

    if (rgb_max == r) {
        hsv.h = 0 + 43*(g - b)/(rgb_max - rgb_min);
    } else if (rgb_max == g) {
        hsv.h = 85 + 43*(b - r)/(rgb_max - rgb_min);
    } else /* rgb_max == rgb.b */ {
        hsv.h = 171 + 43*(r - g)/(rgb_max - rgb_min);
    }

    return hsv;
}
```


출처: http://darkpgmr.tistory.com/66 [다크 프로그래머]
