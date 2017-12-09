#include <iostream> 
using namespace std;


void show(int arr[], int n)
{
	for (int i = 0; i < n; i++) {
		cout << arr[i] << endl;
	}
}

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

		if (i != minIdx) {
			temp = list[i];
			list[i] = list[minIdx];
			list[minIdx] = temp;
		}
	}	

	//show(list, maxNum);
}

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
