# 전이학습(Transfer learning)
- 학습된 모델을 기반으로 최종 출력층을 바꿔 학습하는 기업
- 학습된 모델의 최종 출력층을 보유 중인 데이터에 대응하는 출력층으로 바꾸고,
- 교체한 출력층의 결합 파라미터(그릭고 앞 층의 결합 파라미터)를 소량의 데이터로 다시 학습
- 입력층에 가까운 부분의 결합 파라미터를 변화시키지 않음!

# Fine tuning
- 출력층 등을 변경한 모델을 학습된 모델을 기반으로 구축한 후,
- 직접 준비한 데이터로 신경망 모델의 결합 파라미터 학습
- 결합 파라미터의 초깃값은 학습된 모델의 파라미터 사용
- 전이학습과 달리, (출력층 및 출력층에 가까운 부분 뿐 아니라) 모든 층의 파라미터 재학습
