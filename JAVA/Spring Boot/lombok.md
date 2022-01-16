## lombok 플러그인 다운로드 후 
1. Prefrences > plugin > lombok 검색 실행 (재시작)
2. Prefrences > Annotation Processors 검색 > Enable annotation processing 체크 (재시작)
3. 임의의 테스트 클래스를 만들고 @Getter, @Setter 확


## 자주 쓰는 종류
- @Getter
- @Setter
- @NoArgsConstructor
- @AllArgsConstructor
- @RequiredArgsConstructor = final이나 @NonNull인 필드 값만 파라미터로 받는 생성자
- @ToString(exclude = "password")
- @EqualsAndHashCode(callSuper = true) =  equals와 hashCode
- @Data = @Getter, @Setter, @RequiredArgsConstructor, @ToString, @EqualsAndHashCode
