```
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
              while ($j >= 0 && $aArr[$j] > $iSelectVal) {
                  $aArr[$j + 1] = $aArr[$j];
                  $j--;
              }
          } else if ($bReverse === true) {
              while ($j >= 0 && $aArr[$j] < $iSelectVal) {
                  $aArr[$j + 1] = $aArr[$j];
                  $j--;
              }
          }
          $aArr[$j + 1] = $iSelectVal;
      }

      return $aArr;
  }


```
