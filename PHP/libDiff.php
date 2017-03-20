class libDiff
{
    /**
     * Single array diff
     *
     * @param      $aArrayFrom
     * @param      $aArrayTo
     * @param bool $bKeySort
     * @return array|null
     */
    public static function diff($aArrayFrom, $aArrayTo, $bKeySort = true)
    {
        // for PHP Warning
        if (is_array($aArrayFrom) === false || is_array($aArrayTo) === false) {
            return null;
        }

        $aDiff1 = array_diff_assoc($aArrayFrom, $aArrayTo);
        $aDiff2 = array_diff_assoc($aArrayTo, $aArrayFrom);
        $aKeys = array_unique(array_merge(array_keys($aDiff1), array_keys($aDiff2)));
        if ($bKeySort === true) {
            sort($aKeys);
        }
        $aDiffFrom = array();
        $aDiffTo = array();
        foreach ($aKeys as $sKey) {
            $aDiffFrom[$sKey] = $aDiff1[$sKey];
            $aDiffTo[$sKey] = $aDiff2[$sKey];
        }

        if (empty($aDiffFrom) === true) {
            return null;
        }

        return array('from' => $aDiffFrom, 'to' => $aDiffTo);
    }

    /**
     * Multi array diff
     *
     * @param $aArray1  비교대상
     * @param $aArray2  비교타겟
     * @return array    $aArray1 - ($aArray1 ∩ $aArray2)
     */
    public static function arrayRecursiveDiff($aArray1, $aArray2)
    {
        $aReturn = array();
        if (is_array($aArray1) === false || is_array($aArray2) === false) {
            return $aReturn;
        }

        foreach ($aArray1 as $mKey => $mValue) {
            if (array_key_exists($mKey, $aArray2)) {
                if (is_array($mValue)) {
                    $aRecursiveDiff = self::arrayRecursiveDiff($mValue, $aArray2[$mKey]);
                    if (count($aRecursiveDiff)) {
                        $aReturn[$mKey] = $aRecursiveDiff;
                    }
                } else {
                    if ($mValue != $aArray2[$mKey]) {
                        $aReturn[$mKey] = $mValue;
                    }
                }
            } else {
                $aReturn[$mKey] = $mValue;
            }
        }

        return $aReturn;
    }
}
