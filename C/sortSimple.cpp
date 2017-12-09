#include <iostream> 
using namespace std;


void show(int arr[], int n)
{
	for (int i = 0; i < n; i++) {
		cout << arr[i] << endl;
	}
}

// 선택정렬 (작은것을 찾아서 앞에서부터 오름차순 정렬)
// 복잡도 O(n^2)
// 자리이동 횟수는 고정 3(n-1) 
// 값이 동일한게 있다면 상대적인 위치가 변경될수 있다 
void selectionSort(int list[], int maxNum)
{
	int i, j, min, temp;
	int minIdx = 0;
	

	for (i = 0 ; i< maxNum-1; i++) {
		minIdx = i;
		for (j = i+1; j < maxNum; j++) {
			if (list[j] < list[minIdx]) {
				minIdx = j;
			}
		}

		if (i != minIdx) { // 이 조건이 들어가면 이동 횟수를 줄일수 있음
			temp = list[i];
			list[i] = list[minIdx];
			list[minIdx] = temp;
		}
	}	

	//show(list, maxNum);
}

// 삽입정렬 (앞에서부터 차례로 비교해서 작은것이 있는경우 뽑았다가 그자리에 밀어 넣는 방식)
// 복잡도 : 최적 O(n), 평균&최악 O(n^2)
// 이동횟수 : 복잡도 * 2(n-1) // 2번 올렸다 내리므로..
// 순서대로 있는 경우 유리함 (자리이동이 없기떄문에)
void insersionSort(int list[], int maxNum)
{
	int i, j, temp, minVal;

	for (i = 1; i< maxNum ; i++) {
		minVal = list[i];
		for (j = i-1; j >= 0 && minVal < list[j]; j--) {
			list[j+1] = list[j];
		} 
		list[j+1] = minVal;
	}

	//show(list, maxNum);

}

// 버블정렬 (앞뒤로 비교해가면서 매번 swap를 하며 뒤에서부터 정렬)
// 복잡도 : 최적 O(n), 평균&최악 O(n^2) = n-1 + n-2 + ... + 1
// 이동횟수 O(n^2) = 3 * 복잡도; // 각 반복별로 swap하기 떄문
void bubbleSort(int list[], int maxNum)
{
	int i, j, temp, minIdx;

	for (i = 0; i< maxNum -1 ; i++) {
		for (j = 1; j < maxNum-i; j++) {
			if (list[j-1] > list[j]) {
				temp = list[j];
				list[j] = list[j-1];
				list[j-1] = temp; 
			}
		} 
		
	}

	//show(list, maxNum);
}

int main(void)
{
	int maxNum = 7;
	int list[7] = {5,2,6,4,8,10,3};

	selectionSort(list, maxNum);
	insersionSort(list, maxNum);
	bubbleSort(list, maxNum);

	return 0;
}

// 비교보다 swap 가 메모리 & 속도를 더 잡아먹는다 
// 복잡도가 비슷하다면 이동횟수가적을것을 선택한다 
// 
