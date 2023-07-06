
# 컨테이너 vs 가상머신
- 가상머신 : Infrastructure > Hypervisor(ex, vmware) > Virture Machine 여러개 (Host Operating system + Application) 
- 컨테이너 : Infrastructure > Host Operating system > Docker > Application 여러개
- VM은 하이퍼바이저 위에 Guest OS 가 올라가는데 그 위에 Binary, 라이브러리 등을 모두 구성해야 하기에 무겁고 성능저하가 발생
- 스케일 업 -> 스케일 아웃
