const int trigPin1 = 2; 
const int echoPin1 = 3;
const int trigPin2 = 4; 
const int echoPin2 = 5;   

void setup()
{
    Serial.begin(115200);    
    Serial.println("Hello Arduino!!");

    pinMode(trigPin1, OUTPUT);  
    pinMode(echoPin1, INPUT);
    pinMode(trigPin2, OUTPUT);  
    pinMode(echoPin2, INPUT);   
}

void loop()
{
    float ultraTime1 = readUltrasonic(trigPin1, echoPin1);
    float ultraTime2 = readUltrasonic(trigPin2, echoPin2);

    Serial.print(ultraTime1);
    Serial.print("cm - ");
    Serial.print(ultraTime2);
    Serial.print("cm");
    Serial.println();

    delay(100);
}

/**
 * 초음파 센서 값 읽어오는 함수
 */
float readUltrasonic(int trigPin, int echoPin) 
{
  float duration, distance;
  
  digitalWrite(trigPin, LOW);    
  delayMicroseconds(2);           
  digitalWrite(trigPin, HIGH);    
  delayMicroseconds(10);        
  digitalWrite(trigPin, LOW);    

  duration = pulseIn(echoPin, HIGH);   
  distance = (0.034 * duration) / 2;
  
  return distance;
}
