/**
 * Arduino/Genuino Uno atmega328
 * L298N motor driver
 * DC motor 2
 */
#include <Servo.h>
Servo LKservo;
#define EA 3
#define EB 11
#define M_IN1 4
#define M_IN2 5
#define M_IN3 13
#define M_IN4 12
#define echo 6
#define trig 7
#define servo_moter 3
int motorA_vector = 1; // 모터 방향
int motorB_vector = 1; // 모터 방향
int motor_speed = 255; // 스피드

void setup() {
  pinMode(EA, OUTPUT);
  pinMode(EB, OUTPUT);
  pinMode(M_IN1, OUTPUT);
  pinMode(M_IN2, OUTPUT);
  pinMode(M_IN3, OUTPUT);
  pinMode(M_IN4, OUTPUT);
  pinMode(trig, OUTPUT);
  pinMode(echo, OUTPUT);
  LKservo.attach(servo_moter); // 서보모터 핀 설정
  LKservo.write(90); // 서보모터 초기값 90도 
  delay(3000); // 첫 스타트 갑작스런 움직임을 막기 위한 3초 지연
}

void loop() {
  if (read_ultrasonic() > 16) { // 거리가 16보다 크면 A,B 정회전하여 직진
    motor_con(motor_speed, motor_speed);
  } else if (read_ultrasonic() < 14) { // 거리가 14보다 작으면 A,B 역회전 하여 후진
    motor_con(-motor_speed, -motor_speed);
  } else {
    motor_con(0,0); // 정지
  }
}

/**
 * 초음파 센서 값 읽어오는 함수
 */
int read_ultrasonic(void) 
{
  float return_time, howlong;
  digitalWrite(trig, HIGH); // 초음파 발사
  delay(5); // 0.05초 지연
  digitalWrite(trig, LOW); // 초음파 발사 정지
  return_time = pulseIn(echo, HIGH); // 돌아오는 시간
  howlong = ((float)(340*return_time) / 10000) / 2; // 시간을 거리로 계산
  return howlong;
}

void motor_con(int M1, int M2)
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
