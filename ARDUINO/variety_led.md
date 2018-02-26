## LED  
- 확산형 고휘도LED W5P-White	http://www.eleparts.co.kr/EPX33HU9	
- BIWV-PW5C5T(Hyper Flux 5pie)	http://www.eleparts.co.kr/EPX33HUX
- BIWV-PW5C3T(Super Flux 3pie)	http://www.eleparts.co.kr/EPX33DRC	
- NBL-R5UW(5Ф Ultra White)	http://www.eleparts.co.kr/EPX33MHC
- Neopixcel strip IP65 WS2812B 1개



````c
#include <Adafruit_NeoPixel.h>
#define PIN 6

//네오픽셀을 사용하기 위해 객체 하나를 생성한다. 
//첫번째 인자값은 네오픽셀의 LED의 개수
//두번째 인자값은 네오픽셀이 연결된 아두이노의 핀번호
//세번째 인자값은 네오픽셀의 타입에 따라 바뀌는 flag
Adafruit_NeoPixel strip = Adafruit_NeoPixel(1, PIN, NEO_GRB + NEO_KHZ800);

int onDelay = 5000; //2000;
int offDelay = 1000; // 1000;

int LED1 = 7;
int LED2 = 8;
int pwm_a = 10;
int pwm_b = 11;
int i;


void setup() {
  pinMode(LED1, OUTPUT);   
  pinMode(LED2, OUTPUT);   
  pinMode(pwm_a, OUTPUT);
  pinMode(pwm_b, OUTPUT);
  
  strip.begin(); //네오픽셀을 초기화하기 위해 모든LED를 off시킨다
  strip.show(); 
}

void loop() {
  contNeopixel();
  setLED(LED1);
  setLED(LED2);
  flux(pwm_a);
  flux(pwm_b);
}

void contNeopixel()
{
  colorWipe(strip.Color(127, 127, 127), 50);
  delay(onDelay);      
  colorWipe(strip.Color(0, 0, 0), 50);
  delay(offDelay); 
}

void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<strip.numPixels(); i++) {
      strip.setPixelColor(i, c);
      strip.show();
      delay(wait);
  }
}

void flux(int channel)
{
  analogWrite(channel, 255);
  delay(onDelay);      
  analogWrite(channel, 0);
  delay(offDelay); 
}

void setLED(int led) {
  digitalWrite(led, HIGH);
  delay(onDelay);      
  digitalWrite(led,LOW);
  delay(offDelay); 
}
````
