```php
/**
  * 퀵소트 (Divided and marget)
  * ㄴ 피벗(여기서는 배열의 첫번째 원소) 보다 작은 배열, 큰배열을 나누면서 재귀로
  * ㄴ Worst : O(n2) -> 모두 정렬이 되어 있는경우
  * ㄴ Avg : O(nlog(n))
  *
  * @param array $aArr
  * @param bool  $bReverse 오름차순 true / 내림차순 false
  * @return array
  */
 function quickSort($aArr, $bReverse = false)
 {
     $aLow = $aLarge = array();
     if (count($aArr) < 2) {
         return $aArr;
     }
     $sPivot = key($aArr);
     $sPivotVal = array_shift($aArr);
     foreach ($aArr as $sData) {
         if ($sData > $sPivotVal) {
             $aLarge[] = $sData;
         } else {
             $aLow[] = $sData;
         }
     }

     if ($bReverse === true) {
         return array_merge($this->quickSort($aLarge, $bReverse), array($sPivot => $sPivotVal), $this->quickSort($aLow, $bReverse));
     }

     return array_merge($this->quickSort($aLow, $bReverse), array($sPivot => $sPivotVal), $this->quickSort($aLarge, $bReverse));
 }

 /**
  * 삽입 정렬
  * ㄴ loop 돌면서 처음부터 순서대로 한개씩 뽑아서 앞에 있는 것과 차례로 비교하여 shift 시키고 해당 위치에 넣음
  * ㄴ Best : O(n) -> 모두 정렬이 되어 있는경우
  * ㄴ Worst : O(n2)
  * ㄴ Avg : O(n2)
  * ㄴ 공간 복잡도 : O(n) -> 단 하나의 배열에서만 하므로
  *
  * @param array $aArr
  * @param bool  $bReverse 오름차순 true / 내림차순 false
  * @return array
  */
 function insertionSort($aArr, $bReverse = false)
 {
     $iCount = count($aArr);
     for ($i = 0; $i < $iCount; $i++) {
         $iSelectVal = $aArr[$i];
         $j = $i - 1;
         if ($bReverse === false) {
             for (; $j >= 0 && $aArr[$j] > $iSelectVal; $j--) {
                 $aArr[$j + 1] = $aArr[$j];
             }
         } else if ($bReverse === true) {
             for (; $j >= 0 && $aArr[$j] < $iSelectVal; $j--) {
                 $aArr[$j + 1] = $aArr[$j];
             }
         }
         $aArr[$j + 1] = $iSelectVal;
     }

     return $aArr;
 }

 /**
  * 선택 정렬
  * ㄴ 처음부터 가장 작은값의 인덱스을 찾아서 현 위치와 변경을 한다 (앞에서부터 정렬)
  * ㄴ Best,Worst,Avg : O(n2)
  * ㄴ 공간 복잡도 : O(n) -> 단 하나의 배열에서만 하므로
  *
  * @param array $aArr
  * @return array
  */
 public function selectionSort($aArr)
 {
     $iMaxSize = count($aArr);
     for ($i = 0; $i < $iMaxSize - 1; $i++) {
         $iMin = $i;
         for ($j = $i; $j < $iMaxSize; $j++) {
             if ($aArr[$iMin] > $aArr[$j]) {
                 $iMin = $j;
             }
         }
         if ($iMin !== $i) {
             $aArr = $this->swap($aArr, $i, $iMin);
         }
     }

     return $aArr;
 }

 /**
  * 버블 정렬
  * ㄴ 두개씩 비교하면서 끝부터 차례로 정렬을 한다
  * ㄴ Best,Worst,Avg : O(n2)
  * ㄴ 공간 복잡도 : O(n) -> 단 하나의 배열에서만 하므로
  *
  * @param $aArr
  * @return mixed
  */
 public function bubbleSort($aArr)
 {
     $iMaxSize = count($aArr);
     for ($j = $iMaxSize - 1; $j > 0; $j--) {
         for ($i = 0; $i < $j; $i++) {
             if ($aArr[$i] > $aArr[$i + 1]) {
                 $aArr = $this->swap($aArr, $i, $i + 1);
             }
         }
     }

     return $aArr;
 }
 ```
