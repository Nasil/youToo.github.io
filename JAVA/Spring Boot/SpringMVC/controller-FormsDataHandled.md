참조)
- https://github.com/spring-projects/spring-framework/issues/18012 // spring 이슈
- https://afitnerd.com/2017/05/24/what-if-spring-boot-handled-forms-like-json/ // 이슈들 정리한 부분들중에 방안 여러개
- https://www.baeldung.com/sprint-boot-multipart-requests
- https://e2e2e2.tistory.com/15#controller-%EA%B5%AC%ED%98%84

# 방안1) HttpServletRequest 사용
```java
// controller
public @ResponseBody SlackSlashCommand slack(HttpServletRequest request) { 
```
```java
this.teamId = rquest.getParameter("team_id"); // 하나씩 파라미터 셋팅해줘야함
```
- 단점 : 파라미터 추가할때마다 일일히 추가 해야함, 타입캐스팅도 걸어줘야함

# 방안2) ModelAttribute 사용
 ```java
 public @ResponseBody FormSlackSlashCommand slack3(@ModelAttribute FormSlackSlashCommand slackSlashCommand) {

 @Getter
 @Setter // 필수
 public class FormSlackSlashCommand extends AbstractFormSlackSlashCommand {
  @JsonProperty("team_id")
  private String teamId;
}
 ```
 ```java
 @Getter
 @Setter // 필수
public abstract class AbstractFormSlackSlashCommand {
  public void setTeam_id(String teamId) { // 언더바 setter 메소드 생성
      setTeamId(teamId);
  }
  abstract void setTeamId(String teamId);
}
 ```
 - 장점 : 알아서 타입캐스팅 됨.
 - 단점 : 메소드 언더바가 있는 경우 추가 해줘야하는 번거로움
 
 # 방안3) Custom HandlerMethod ArgumentResolver
 ```java
 public class SlackSlashCommandMethodArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return methodParameter.getParameterType().equals(SlackSlashCommand.class);
    }

    @Override
    public Object resolveArgument(
        MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer,
        NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory
    ) throws Exception {

        SlackSlashCommand ret = new SlackSlashCommand();
        ret.setTeamId(nativeWebRequest.getParameter("team_id")); // 방안1처럼 또 걸어줘야함

        return ret;
    }

    private boolean isNotSet(String value) {
        return value == null;
    }
}
```
```java
@Configuration
public class SlackSlashCommandMethodArgumentResolverConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new SlackSlashCommandMethodArgumentResolver());
    }
}
```
 - 장점 : 알아서 타입캐스팅 됨.
 - 단점 : 방안1처럼 하나씩 넣어줘야함

# 방안4) Custom HttpMessageConverter
```java
public class SlackSlashCommandConverter extends AbstractHttpMessageConverter<SlackSlashCommand> {

    // no need to reinvent the wheel for parsing the query string
    private static final FormHttpMessageConverter formHttpMessageConverter = new FormHttpMessageConverter();
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected boolean supports(Class<?> clazz) {
        return (SlackSlashCommand.class == clazz);
    }

    @Override
    protected SlackSlashCommand readInternal(Class<? extends SlackSlashCommand> clazz, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
        Map<String, String> vals = formHttpMessageConverter.read(null, inputMessage).toSingleValueMap();
        return mapper.convertValue(vals, SlackSlashCommand.class);
    }
}
```
```java
@Configuration
public class SlackSlashCommandConverterConfig extends WebMvcConfigurerAdapter {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        SlackSlashCommandConverter slackSlashCommandConverter = new SlackSlashCommandConverter();
        MediaType mediaType = new MediaType("application","x-www-form-urlencoded", Charset.forName("UTF-8"));
        slackSlashCommandConverter.setSupportedMediaTypes(Arrays.asList(mediaType));
        converters.add(slackSlashCommandConverter);
        super.configureMessageConverters(converters);
    }
}
```

# 방안5) Controller 에서 objectMapping
```java
@RequestMapping(value = "/slack4", method = RequestMethod.POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public @ResponseBody SlackSlashCommand slack4(@RequestBody MultiValueMap<String, String> reqMap, @RequestHeader("content-type") String contentType) {
    ObjectMapper objectMapper = new ObjectMapper();
    SlackSlashCommand slackSlashCommand = objectMapper.convertValue(reqMap.toSingleValueMap(), SlackSlashCommand.class);
    return slackSlashCommand;
}
```

# 방안6) 스프링 6.1 에서 제공 
- For 6.1, we've added enhanced support for constructor binding in DataBinder including nested constructors (#20806) the option to customize the bind value name with an @BindParam annotation (#30947). 
```java
public class SlackSlashCommand {

    private String token;
    private String command;
    private String text;
    private String teamId;
    private String teamDomain;

    public SlackSlashCommand(
            String token, String command, String text, 
            @BindParam("team_id") String teamId, @BindParam("team_domain") String teamDomain) {

        // ...
    }

}
```
