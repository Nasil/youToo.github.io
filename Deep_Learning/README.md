

## SoftMax
- SVM과 더불어 많이 쓰이는 Classifier.
- Logistic regression classifier의 multiple class 에 대한 일반화 개념.
- 각 class의 score를 받아서 normalized class probability(확률)들을 리턴한다.
```
import numpy as np

def softmax(a):
        c = np.max(a)
        exp_a = np.exp(a - c)
        sum_exp_a = np.sum(exp_a)
        y = exp_a / sum_exp_a
        return y;


a = np.array([0.3, 2.9, 4.0])

```


# forward propagation

- 학습 -> 추론 
- 회귀 : 입력된 데이터에서 (연속적인) 수치를 예측하는 것 ex) 사진속의 인물의 몸무게 예측
- 분류 : 데이터가 어느 클래스에 속하느냐 ex) 사람, 동물, 성별


