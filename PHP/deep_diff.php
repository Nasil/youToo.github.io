     /**
     * Multi array diff
     *
     * @param array $aArray1 비교대상
     * @param array $aArray2 비교타겟
     * @param array $aSkip   skip 할 데이터
     * @return array  단방향 Diff
     *                       $aArray1 - ($aArray1 ∩ $aArray2)
     */
    public static function arrayRecursiveDiff($aArray1, $aArray2, $aSkip = array())
    {
        $aReturn = array();
        if (is_array($aArray1) === false || is_array($aArray2) === false) {
            return $aReturn;
        }

        foreach ($aArray1 as $mKey => $mValue) {
            if (array_key_exists($mKey, $aArray2)) {
                if (is_array($mValue)) {
                    $aRecursiveDiff = self::arrayRecursiveDiff($mValue, $aArray2[$mKey], $aSkip);
                    if (count($aRecursiveDiff)) {
                        $aReturn[$mKey] = $aRecursiveDiff;
                    }
                } else {
                    if (libValid::isEmpty($aSkip) === false && in_array($mKey, $aSkip) === false) {
                        if ($mValue != $aArray2[$mKey]) {
                            $aReturn[$mKey] = $mValue;
                        }
                    }
                }
            } else {
                $aReturn[$mKey] = $mValue;
            }
        }

        return $aReturn;
    }
