#include <Servo.h>
#include <IRremote.h>
Servo LKservo;
#define EA 3
#define EB 11
#define M_IN1 4
#define M_IN2 5
#define R_Sensor 8
#define C_Sensor 9
#define L_Sensor 10
#define M_IN3 13
#define M_IN4 12
#define echoPin 6
#define trigPin 7
#define servo_moter 2
int motorA_vector = 1; // 모터 방향
int motorB_vector = 1; // 모터 방향
int motor_speed = 255; // 스피드
int servoDegree = 30;
int servoSign = 1;
int RECV_PIN = 14;
IRrecv irrecv(RECV_PIN);
decode_results results;

void setup() {
  pinMode(EA, OUTPUT);
  pinMode(EB, OUTPUT);
  pinMode(M_IN1, OUTPUT);
  pinMode(M_IN2, OUTPUT);
  pinMode(M_IN3, OUTPUT);
  pinMode(M_IN4, OUTPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(R_Sensor, INPUT);
  pinMode(C_Sensor, INPUT);
  pinMode(L_Sensor, INPUT);
  Serial.begin(9600); // 통신속도 9600bps
  LKservo.attach(servo_moter); // 서보모터 핀 설정
  LKservo.write(90); // 서보모터 초기값 90도 
  irrecv.enableIRIn(); // Start the receiver
  delay(3000); // 첫 스타트 갑작스런 움직임을 막기 위한 3초 지연
}

void loop() {
  if (irrecv.decode(&results)) {
    int a = results.value;
    Serial.println(a, HEX);
    irrecv.resume();
  }

  float ultraTime = readUltrasonic();
  if (ultraTime > 20) { 
    // 거리가 x보다 크면 A,B 정회전하여 직진
    motorControl(motor_speed, motor_speed);
    if (digitalRead(C_Sensor) == LOW) {
      motorControl(motor_speed, motor_speed);  
    } else if (digitalRead(L_Sensor) == LOW) {
      motorControl(motor_speed, -motor_speed);  
    } else if (digitalRead(R_Sensor) == LOW) {
      motorControl(-motor_speed, motor_speed);
    }
  } else if (ultraTime < 14) { 
    // 거리가 x보다 작으면 A,B 역회전 하여 후진
    motorControl(-motor_speed, -motor_speed);
  } else {
    // 정지
    motorControl(0,0); 
  }

  delay(100);
}

void servoCon(int trig)
{
  if(trig == 0){
    servoDegree = 30;
  } else {
    if(servoDegree >= 180) {
      servoSign = -1;
    } else if (servoDegree <= 30) {
      servoSign = +1;
    }
    servoDegree += servoSign * 10;
  }
  LKservo.write(servoDegree);
  delay(100);  
}

float readUltrasonic(void) 
{
  float duration, distance;
  
  digitalWrite(trigPin, LOW);     // Trig 핀 Low
  delayMicroseconds(2);           // 2us 유지
  digitalWrite(trigPin, HIGH);    // Trig 핀 High
  delayMicroseconds(10);          // 10us 유지
  digitalWrite(trigPin, LOW);     //Trig 핀 Low

  //Echo 핀으로 들어오는 펄스의 시간 측정
  //pulseIn함수가 호출되고 펄스가 입력될 때까지의 시간. us단위로 값을 리턴.
  duration = pulseIn(echoPin, HIGH);   
  
  //음파가 반사된 시간을 거리로 환산
  //음파의 속도는 340m/s 이므로 1cm를 이동하는데 약 29us.
  //따라서, 음파의 이동거리 = 왕복시간 / 1cm 이동 시간 / 2 이다.
  distance = ((float)(340 * duration) / 10000) / 2;
  
  return distance;
}

void motorControl(int M1, int M2)
{
  if (M1>0) { 
    digitalWrite(M_IN1, motorA_vector); // IN1 에 HIGH (motoA 가 0이면 LOW)
    digitalWrite(M_IN2, !motorA_vector); // IN2 에 LOW (motoA 가 0이면 HIGH)
  } else if (M1<0) {
    digitalWrite(M_IN1, !motorA_vector); // IN1 에 LOW (motoA 가 0이면 HIGH)
    digitalWrite(M_IN2, motorA_vector); // IN2 에 HIGH (motoA 가 0이면 LOW)
  } else {
    digitalWrite(M_IN1, LOW);
    digitalWrite(M_IN2, LOW);
  }

  if (M2>0) { 
    digitalWrite(M_IN3, motorB_vector);
    digitalWrite(M_IN4, !motorB_vector);
  } else if (M2<0) {
    digitalWrite(M_IN3, !motorB_vector);
    digitalWrite(M_IN4, motorB_vector);
  } else {
    digitalWrite(M_IN3, LOW);
    digitalWrite(M_IN4, LOW);
  }
  
  analogWrite(EA, abs(M1)); // M1 의 절대값으로 모터 속도 제어
  analogWrite(EB, abs(M2)); // M2 의 절대값으로 모터 속도 제어
}
