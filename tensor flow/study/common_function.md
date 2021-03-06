

## SoftMax
- SVM과 더불어 많이 쓰이는 Classifier.
- Logistic regression classifier의 multiple class 에 대한 일반화 개념.
- 각 class의 score를 받아서 normalized class probability(확률)들을 리턴한다.

# 계단함수 vs 시그모이드 함수 vs reLu 함수
- 공통점 : 비선형 함수이다
- 차이점 : 결과값이 연속적인지, 연속적이지 않은지
- 신경망 알고리즘은 모두 비선형 함수이다. 왜냐면 1차원 직선으로 표현할수 없는 데이터를 학습하는데 유용한 알고리즘이기 때문에

```
# coding: utf-8
import numpy as np


def identity_function(x):
    return x


def step_function(x):
    return np.array(x > 0, dtype=np.int)


def sigmoid(x):
    return 1 / (1 + np.exp(-x))    


def sigmoid_grad(x):
    return (1.0 - sigmoid(x)) * sigmoid(x)
    

def relu(x):
    return np.maximum(0, x)


def relu_grad(x):
    grad = np.zeros(x)
    grad[x>=0] = 1
    return grad
    

def softmax(x):
    if x.ndim == 2:
        x = x.T
        x = x - np.max(x, axis=0)
        y = np.exp(x) / np.sum(np.exp(x), axis=0)
        return y.T 

    x = x - np.max(x) # 오버플로 대책
    return np.exp(x) / np.sum(np.exp(x))


def mean_squared_error(y, t):
    return 0.5 * np.sum((y-t)**2)


def cross_entropy_error(y, t):
    if y.ndim == 1:
        t = t.reshape(1, t.size)
        y = y.reshape(1, y.size)
        
    # 훈련 데이터가 원-핫 벡터라면 정답 레이블의 인덱스로 반환
    if t.size == y.size:
        t = t.argmax(axis=1)
             
    batch_size = y.shape[0]
    return -np.sum(np.log(y[np.arange(batch_size), t] + 1e-7)) / batch_size


def softmax_loss(X, t):
    y = softmax(X)
    return cross_entropy_error(y, t)

```




# forward propagation

- 학습 -> 추론 
- 회귀 : 입력된 데이터에서 (연속적인) 수치를 예측하는 것 ex) 사진속의 인물의 몸무게 예측
- 분류 : 데이터가 어느 클래스에 속하느냐 ex) 사람, 동물, 성별


# 퍼셉트론 -> 신경망

## 손실함수
- 평균 제곱 오차
- 교차 엔트로피 오차 
- 미니 배치
- 사용하는 이유 : 매개변수의 미분(기울기)를 계산하고, 그 미분값을 단서로 매개변수를 서서히 갱신하는 기준이 됨.

## 신경망 학습 절차 (SGD)
- 가중치(w), 편향(b)을 훈련 데이터에 적응하도록 조정하는 과정을 '학습' 이라고함
- 1. 미니 배치 : 무작위로 데이터를 가져옴. 선별한 데이터를 미니 배치라 하며 손실 값을 줄이는 것을 학습 목표로 둠
- 2. 기울기 산출 : 가중치 매개변수의 기울기를 구하고 기울기는 손실 함수의 값을 가장 작게 하는 방향을 제시함.
- 3. 매개변수 갱신 : 가중치 매개변수를 기울기 방향으로 갱신
- 4. 반복 : 1~3을 반복하면서 손실값이 가장 작은 가중치를 찾아감. 

- https://github.com/WegraLee/deep-learning-from-scratch

