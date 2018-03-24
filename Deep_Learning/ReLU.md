
## 퍼셉트론 -> 신경망

# 계단함수 vs 시그모이드 함수 vs reLu 함수
- 공통점 : 비선형 함수이다
- 차이점 : 결과값이 연속적인지, 연속적이지 않은지
- 신경망 알고리즘은 모두 비선형 함수이다. 왜냐면 1차원 직선으로 표현할수 없는 데이터를 학습하는데 유용한 알고리즘이기 때문에

```

import numpy as np
import matplotlib.pylab as plt

def relu(x) :
        return np.maximum(0, x)

def sigmoid(x):
        return 1 / (1 + np.exp(-x))

def step_function(x):
        return np.array(x > 0, dtype = np.int)

x = np.arange(-5.0, 5.0, 0.1)
y = step_function(x);
z = sigmoid(x);
r = relu(x);

plt.plot(x,r)
plt.ylim(-0.1, 1.1)
plt.show();

```
