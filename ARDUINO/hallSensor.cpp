#define hall_A A0
#define hall_D A1

void setup() {  
  Serial.begin(9600);  
  pinMode(hall_A,INPUT);  
  pinMode(hall_D,INPUT); 
} 

void loop() {  
  delay(100);  
  Serial.print(analogRead(hall_A));  
  Serial.print("\t");  
  Serial.println(digitalRead(hall_D));   
}
