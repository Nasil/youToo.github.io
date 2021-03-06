- OS(Operating System) 사전적 정의 : 컴퓨터의 작동 방식을 제어하는 컴퓨터의 주된 프로그램으로, 다름 프로그램의 작동을 가능하게 함.
- 커널이란? 커널은 컴퓨터 하드웨어, 메모리 엑세스, CPU, 저장장치, 파일시스템 등을 감독하고 제어하는 소프트웨어다. 

## OS의 구성요소
1. 커널 : OS 가 인터럽트를 사용해 CPU 의 시간을 비트 단위로 slice 해서 현재 실행 중인 각 프로세스로 할당을 하면서 멀티 태스킹을 할수 있도록 한다.
- 커널 드라이버 : 커널과 응용 프로그램 사이에 있는 작은 프로그램이다.  
- 커널 역할 : 응용 프로그램의 입출력 요청을 제어하고 이를 데이터 처리 명령어로 변환해서 cpu에 떠먹여준다.(뇌)
2. 네트워킹 : 커널의 제어하에 있는 복잡한 하위 시스템으로써 사용자에게 이더넷과 같은 다양한 네트워크 프로토콜과 장치를 제어하고 지원하며, 네트워킹이 가능하게 한다.
3. 보안 : 보안을 위해 하위 시스템은 인증, 감사,  권한 관리를 한다.
4. 사용자인터페이스 : 초기에는 커멘드라인이 주류 인터페이스였으나 GPI 기능을 제록스가 개발하면서 주로 사용하게 되었다. 

## OS 종류
- 윈도우, 유닉스, 리눅스, x윈도우, 맥os

## OS 장점
- 응용프로그램이 하드웨어에 쉽고 안전하게 접근할수 있게한다. 시스템의 충돌없이 원하는 작업을 수행하게 한다.
- 무단 액세스 또는 데이터 손실을 방지하기 위해 데이터 공유 및 보안을 관리해서 효율적이고 정확한 시스템 작동이 가능하게 한다.
- 메모리, 스토리지, 네트워크 소켓 및 인터넷과 같은 리소스를 사용할수 있다. 

# 부팅 
1. BIOS 또는 UEFI 칩에 전원이 공급되고 하드웨어가 정상인지 확인하기 위한 진단 프로그램이 실행되면 구성 요소가 초기화되고 부트스트랩 프로그램이 시작된다.
2. 부트로더는 OS를 저장소에서 작업 메모리로 로드하고 시작한다.
3. OS는 작업 메모리에 데이터 구조를 만들고 CPU에 필요한 레지스터를 설정하여 사용자 프로그램을 실핸한다. 이후 OS는 인터럽트를 받아들이고 컴퓨터 사용이 완전히 가능해진다.

ex) 라즈베리파이 부팅
* 라즈베리파이3 CPU에는 1.2GHz 로 실행되는 4개의 코어가 탑재되어 있다. 
* 라즈베리파이의 보드는 ARM이 설계한 CPU를 탑재하고 있다. 
* 라즈베리파이에는 ROM이 포함되지 않는데 부트프로그램을 저장하기 위하여 SoC에 작은 용량의 램이 탑재 된다.

** ARM 코어가 꺼진 상태에서 GPU가 먼저 켜진다.
** GPU는 SoC칩의 ROM에서 1단계 부트로더를 실행한다.
** 1단계 부트로더는 SD 카드에서 2단계 부트로더인 bootcode.bin 을 L2캐시에 로드하고 실행한다.
** Soc의 SDRAM 을 켜고 3단계 부트로더인 loader.bin 을 로드하고 실행한다.
** GPU의 펌웨어인 start.elf 을 실행하고 이것은 config.txt, cmdline.txt, kernel.img 를 읽고 os를 실행한다.

# 펌웨어 
os에 맞는 저장소를 검색하고 업데이트 및 설치를 한다. 
ex) sudo apt-get update && sudo apt-get upgrade

## 멀티 프로세싱
여러개의 프로세서가 하나의 작업을 병렬처리하는것.

## 멀티태스킹
OS 커널이 제어하는것. CPU의 시간을 슬라이싱해서 각 프로세서에 할당을해서 스위칭하며 멀티 태스킹이 가능하도록 하는 것 

## 멀티 스레딩
스레드는 프로세스내에서 생성되는 하나의 실행 주체이다. 한 프로세스내에서 여러개의 스레드가 동시에 생성이 가능하다.
스레드는 하나의 공유 메모리를 가지며 서로 자원을 공유한다.
