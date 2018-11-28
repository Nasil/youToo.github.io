버그가 발생되었다 

윈도우에서 하면 성공하고 리눅스에서 하면 실패 
```
$sOrgOtpName = '한글';
$aVal = strtolower($sOrgOtpName);
var_dump($aVal);
// 윈도우 한글
// 리눅스 ??? ?????
```

### 해결 방안 1) vi /etc/sysconfig/i18n 
```
LANG="en_US.UTF-8" -> ko_KR.UTF-8
SUPPORTED="en:en_US:en_US.UTF-8:ko:ko_KR:ko_KR.eucKR:ko_KR.UTF-8"
SYSFONT="latarcyrheb-sun16"
```
### 해결 방안 2)
- http://php.net/manual/en/function.setlocale.php
```
setlocale(LC_CTYPE,'C');
```
###해결 방안 3) php.ini
```
default_charset="UTF-8"
````
