### Selenium 이란?
- https://www.seleniumhq.org/
- Web 어플리케이션을 위한 소프트웨어 프레임워크이고 Record/Playback tool을 지원한다.(Selenium IDE)
- 언어 지원 : Java, C#, Groovy, Perl , PHP, Python , Ruby
- 플랫폼 지원 : Liunx, Windows, 심지어 Macintosh 플랫폼을 지원한다.
- 라이센스 :  Open-Sorce(Apache 2.0) 이다.
- Selenium IDE (http://seleniumhq.org/projects/ide/)
```
// 셀레니움 지원하는 환경
Google Chrome
Internet Explorer 6, 7, 8, 9, 10 – 32 and 64-bit where applicable
Firefox: latest ESR, previous ESR, current release, one previous release
Safari
Opera
HtmlUnit
phantomjs
Android (with Selendroid or appium)
iOS (with ios-driver or appium)
Google Chrome
Internet Explorer 6, 7, 8, 9, 10 – 32 and 64-bit where applicable
Firefox: latest ESR, previous ESR, current release, one previous release
Safari
Opera
HtmlUnit
phantomjs
Android (with Selendroid or appium)
iOS (with ios-driver or appium)
```
- WebDriver : WebDriver 는 ID/Class/XPath/CSS 등을 이용해 Element를 지정하여 테스트 가능 가능합니다. 
- WebDriver는 인터페이스이며 ChromeDriver는 WebDriver 인터페이스를 구현하는 클래스입니다. 
- 실제로 ChromeDriver는 WebDriver를 구현하는 RemoteWebDriver를 확장합니다. 
- ChromeDriver, FirefoxDriver와 같은 모든 WebDriver를 추가하기 만하면 EdgeDriver는 WebDriver를 구현해야합니다.
```
public static WebDriver startDriver(Browsers browserType)
{
    switch (browserType)
    {
        case FIREFOX:
            ...
            return new FirefoxDriver();
        case CHROME:
            ...
            return new ChromeDriver();
        case IE32:
            ...
            return new InternetExplorerDriver();
        case IE64:
            ...
            return new InternetExplorerDriver();
        default:
            throw new InvalidParameterException("Unknown browser type");
    }
}

public enum Browsers
{
    CHROME, FIREFOX, IE32, IE64;
}
```


### 개발하기
- php를 사용하려고 한다. 
- facebook에서 만든 오픈 라이브러리가 있다. 
- https://github.com/facebook/php-webdriver
- https://facebook.github.io/php-webdriver/latest/
- php-webdriver 라이브러리는 Selenium WebDriver를위한 PHP 언어 바인딩된 라이브러리이다. PHP에서 웹 브라우저를 제어 할 수 있다.
- 이 라이브러리는 Selenium 서버 버전 2.x 및 3.x와 호환됩니다. JsonWireProtocol은 현재 Selenium 서버에서 지원되며 향후 W3C WebDriver 사양을 구현합니다.


### 고민
- firefox를 쓸까? chrome을 쓸까?
- FirefoxDriver가 셀렌 표준 단독 라이브러리와 번들되어 있다. 따라서 Firefox 브라우저에서 테스트를 초기화하고 실행할 수 있다. 
- 지원되는 버전 및 일치하는 드라이버 목록을 확인할 수 있다. 
- Firefox와 달리 ChromeDriver의 경우 WebDriver의 프로토콜을 기반으로 외부 파일을 설치해야 한다
- 이 고민은 사용자 user 와 내가 만들기 편한것을 선택하는 것으로 했다
