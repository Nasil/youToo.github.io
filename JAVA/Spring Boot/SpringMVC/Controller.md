### @Controller
1. Client는 URI 형식으로 웹 서비스에 요청을 보낸다.
2. Mapping되는 Handler와 그 Type을 찾는 DispatcherServlet이 요청을 인터셉트한다.
3. Controller가 요청을 처리한 후에 응답을 DispatcherServlet으로 반환하고, DispatcherServlet은 View를 사용자에게 반환한다.
4. @Controller가 View를 반환하기 위해서는 ViewResolver가 사용되며, ViewResolver 설정에 맞게 View를 찾아 렌더링합니다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2BnED%2Fbtqybg36Dak%2F3HgL3gUKHBSOmyeM4hIn00%2Fimg.png)


### @RestController = @Controller + @ResponseBody
1. Client는 URI 형식으로 웹 서비스에 요청을 보낸다.
2. Mapping되는 Handler와 그 Type을 찾는 DispatcherServlet이 요청을 인터셉트한다.
3. RestController는 해당 요청을 처리하고 데이터를 반환한다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F7bceC%2Fbtqx8K6BbxE%2FLVs4KK74mUj9CZ70uHTsjK%2Fimg.png)





## Controller Annotation

### RequetParam
1개의 HTTP 파라미터를 얻기 위해 사용되며 기본값을 지정할 수 있음
필수 여부가 true이기 때문에 반드시 필요한 경우가 아니라면 required=false 설정이 필요함

### RequestBody
- Json 형태로 받은 HTTP Body 데이터를 MessageConverter를 통해 변환시킴
- 기본 생성자로 객체를 만들고, Getter나 Setter 등의 메소드로 필드를 찾아 Reflection으로 값을 설정함
- @RequestBody를 사용하면 요청 본문의 JSON, XML, Text 등의 데이터가 적합한 HttpMessageConverter를 통해 파싱되어 Java 객체로 변환 된다.
- @RequestBody를 사용할 객체는 필드를 바인딩할 생성자나 setter 메서드가 필요없다. 다만 직렬화를 위해 기본 생성자는 필수다. 또한 데이터 바인딩을 위한 필드명을 알아내기 위해 getter나 setter 중 1가지는 정의되어 있어야 한다.

### ModelAttribute
- multipart/form-data 형태로 받은 HTTP Body와 파라미터들을 객체에 바인딩시킴
- 기본적으로 생성자로 값이 설정되고, 생성자로 설정되지 않은 필드는 Setter로 설정됨
- @ModelAttribute를 사용하면 HTTP 파라미터 데이터를 Java 객체에 맵핑한다.
- 따라서 객체의 필드에 접근해 데이터를 바인딩할 수 있는 생성자 혹은 setter 메서드가 필요하다.
- Query String 및 Form 형식이 아닌 데이터는 처리할 수 없다.

참고
- https://mangkyu.tistory.com/49 [MangKyu's Diary]
- https://tecoble.techcourse.co.kr/post/2021-05-11-requestbody-modelattribute/

