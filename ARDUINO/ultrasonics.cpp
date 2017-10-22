const int trigPin1 = 3; 
const int echoPin1 = 2;
const int trigPin2 = 5; 
const int echoPin2 = 4; 
const int trigPin3 = 7; 
const int echoPin3 = 6; 
const int trigPin4 = 9; 
const int echoPin4 = 8; 
const int trigPin5 = 11; 
const int echoPin5 = 10; 
const int trigPin6 = 13; 
const int echoPin6 = 12;   

void setup()
{
    Serial.begin(115200);    
    Serial.println("Hello Arduino!!");

    pinMode(trigPin1, OUTPUT);  
    pinMode(echoPin1, INPUT);
    pinMode(trigPin2, OUTPUT);  
    pinMode(echoPin2, INPUT); 
    pinMode(trigPin3, OUTPUT);  
    pinMode(echoPin3, INPUT); 
    pinMode(trigPin4, OUTPUT);  
    pinMode(echoPin4, INPUT);
    pinMode(trigPin5, OUTPUT);  
    pinMode(echoPin5, INPUT);
    pinMode(trigPin6, OUTPUT);  
    pinMode(echoPin6, INPUT);    
}

void loop()
{
    float ultraTime1 = readUltrasonic(trigPin1, echoPin1);
    float ultraTime2 = readUltrasonic(trigPin2, echoPin2);
    float ultraTime3 = readUltrasonic(trigPin3, echoPin3);
    float ultraTime4 = readUltrasonic(trigPin4, echoPin4);
    float ultraTime5 = readUltrasonic(trigPin5, echoPin5);
    float ultraTime6 = readUltrasonic(trigPin6, echoPin6);

    Serial.print(ultraTime1);
    Serial.print("cm - ");
    Serial.print(ultraTime2);
    Serial.print("cm - ");
    Serial.print(ultraTime3);
    Serial.print("cm - ");
    Serial.print(ultraTime4);
    Serial.print("cm - ");
    Serial.print(ultraTime5);
    Serial.print("cm - ");
    Serial.print(ultraTime6);
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
