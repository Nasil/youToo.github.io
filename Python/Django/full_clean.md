# Model.full_clean()
- Model.clean_fields(), Model.clean(), Model.validate_unique() 세개의 메소드가 연달아 호출됨


# Model.clean_fields():
- 모델에 정의한 필드들을 validate한다.
- exclude 속성을 사용하면 validate하지 않을 필드를 정할 수 있다.
- 필드들이 검증을 통과하지 못하면 ValidationError를 발생시킨다.

# Model.clean():
- clean()메소드안에 정의한 사용자 정의 Validation을 검증한다.

# Model.validate_unique()
- unique를 설정해놓은 field들이 unique한지 검증이 된다.
