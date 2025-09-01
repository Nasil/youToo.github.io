# 모델하우스(Modelhouse) AI 활용 구간 분석 Wiki

## 개요
본 문서는 pyapi-mp 프로젝트의 modelhouse 관련 파일들에서 AI(GeminiApiModel)를 활용하는 구간들을 분석하여 정리한 문서입니다.

## 분석 대상 파일 목록
총 25개의 modelhouse 관련 파일 중 AI를 활용하는 주요 파일들:

### 1. 핵심 AI 활용 파일
- `src/service/octobot/modelhouse/service_octobot_modelhouse_optimizer.py`
- `src/service/octobot/modelhouse/optimizer/service_octobot_modelhouse_optimizer_coupang.py`
- `src/service/octobot/modelhouse/util/service_octobot_modelhouse_util_validate.py`
- `src/service/octobot/modelhouse/service_octobot_modelhouse.py`

## AI 활용 구간 상세 분석

### 1. OctobotModelhouseOptimizerService (기본 최적화 서비스)

#### 파일 위치
`src/service/octobot/modelhouse/service_octobot_modelhouse_optimizer.py`

#### AI 관련 Import
```python
from src.util.api.util_gemini_api import GeminiApiModel, GeminiApiUtil
```

#### 주요 AI 활용 메서드

##### 1.1 초기화 및 설정
```python
def __init__(self, mall_id: str, shop_no: int, market_code: str, market_user_id: str, entity_code: str = None):
    # ...
    self._gemini_api_util: GeminiApiUtil = GeminiApiUtil()
```
- **목적**: Gemini API 유틸리티 초기화
- **위치**: 라인 62

##### 1.2 최적화 데이터 점수 조회 (get_optimize_data_score)
```python
def get_optimize_data_score(self, optimize_data: dict) -> int:
    # AI 점수 프롬프트 생성
    prompt = self.get_ai_score_prompt(before_sections, after_sections, market_name)
    ai_response = self._gemini_api_util.get_gemini_api_call(prompt)
    # AI 응답 파싱
    ai_score_data = self.parse_ai_score_response(ai_response)
    return ai_score_data
```
- **목적**: 상품 최적화 전/후 데이터를 AI로 평가하여 점수 산출
- **위치**: 라인 280-346
- **AI 활용**: 상품 최적화 결과의 SEO 점수를 0-100점으로 평가

##### 1.3 SEO 텍스트 AI 생성 (seo_text_ai_generate)
```python
def seo_text_ai_generate(self, prd_cate_name: str, prd_name_before: str, prd_name_after: str, ai_analysis_img: str = None) -> dict:
    prompt = self.get_seo_text_prompt(prd_cate_name, prd_name_before, prd_name_after, ai_analysis_img)
    ai_response = self._gemini_api_util.get_gemini_api_call(prompt)
    # SEO 텍스트 추출 및 정제
    seo_text = ai_response.strip()
    seo_text = re.sub(r"[^가-힣a-zA-Z0-9\s]", "", seo_text)
    return {"seo_text": {"before": None, "after": seo_text}}
```
- **목적**: 마켓별 검색 키워드 생성
- **위치**: 라인 348-386
- **AI 활용**: 상품 정보를 바탕으로 마켓 등록용 검색 키워드 생성

##### 1.4 AI 점수 프롬프트 생성 (get_ai_score_prompt)
```python
def get_ai_score_prompt(self, before_sections: list, after_sections: list, market_name: str) -> str:
    prompt = f"""
    **목표:** 상품 정보를 기준으로 검색 노출이 잘 되게 하기 위해 AI를 활용한 결과에 대한 점수를 평가해주세요.
    
    **입력 정보:**
    Before: {before_sections}
    After: {after_sections}
    
    **요구사항**
    위 내용은 자사몰의 상품정보를 기준으로 {market_name}에서 검색노출이 잘 되게 하기 위해 
    AI를 활용하여 {market_name}의 검색 알고리즘을 prompt에 넣어 변경해서 등록 한 내용입니다.
    검색 노출 기준으로 평가를 했을때 Before의 SEO점수와 After의 SEO점수를 0~100점으로 표현해 주세요.
    """
```
- **목적**: AI 점수 평가를 위한 프롬프트 생성
- **위치**: 라인 431-462

##### 1.5 SEO 텍스트 프롬프트 생성 (get_seo_text_prompt)
```python
def get_seo_text_prompt(self, prd_cate_name: str, prd_name_before: str, prd_name_after: str, ai_analysis_img: str = None) -> str:
    return f"""
    [요구사항]
    상품명 기반 검색 키워드 1개 추출 요청.
    - 16바이트 이하. 3개 단어 조합 이하로 생성.
    - 아래 상품 정보를 기준으로 마켓(스마트스토어, 쿠팡 등) 상품 등록에 사용할 수 있는 검색 키워드를 추출해 주세요.
    
    [상품 정보]
    {desc_product}
    """
```
- **목적**: SEO 키워드 생성을 위한 프롬프트 생성
- **위치**: 라인 388-429

### 2. OctobotModelhouseOptimizerCoupangService (쿠팡 특화 최적화)

#### 파일 위치
`src/service/octobot/modelhouse/optimizer/service_octobot_modelhouse_optimizer_coupang.py`

#### AI 관련 Import
```python
from src.util.api.util_gemini_api import GeminiApiModel
```

#### 주요 AI 활용 메서드

##### 2.1 상품 키워드 AI 최적화 (ai_optimize_prd_keyword)
```python
def ai_optimize_prd_keyword(self, product: dict, ai_market_data: dict = {}) -> tuple[str, str]:
    if prd_keyword == after_prd_keyword:
        # ai 프롬프트 새로 작성
        prompt = self.get_prd_keyword_prompt(product)
        ai_response = self._gemini_api_util.get_gemini_api_call(prompt)
        if ValidUtil.is_valid(ai_response):
            ai_response = ai_response.strip()
            ai_response = ai_response.replace(", ", ",")
            after_prd_keyword = ai_response
```
- **목적**: 쿠팡 마켓용 상품 키워드 최적화
- **위치**: 라인 43-72
- **AI 활용**: 상품 정보를 바탕으로 쿠팡 검색에 최적화된 키워드 생성

##### 2.2 상품 키워드 프롬프트 생성 (get_prd_keyword_prompt)
```python
def get_prd_keyword_prompt(self, product: dict) -> str:
    return f"""
    [요구사항]
    당신은 숙련된 SEO 전문가입니다. 
    아래 상품 정보를 기준으로 쿠팡 상품 등록에 사용할 수 있는 검색 키워드를 추출해 주세요.
    키워드는 반드시 1개 단어 조합으로 구성하고, 5개 미만으로 추출해 주세요.
    
    [상품 정보]
    {desc_product}
    """
```
- **목적**: 쿠팡 특화 키워드 생성 프롬프트
- **위치**: 라인 74-105

### 3. OctobotModelhouseUtilValidateService (검증 서비스)

#### 파일 위치
`src/service/octobot/modelhouse/util/service_octobot_modelhouse_util_validate.py`

#### AI 관련 Import
```python
from src.util.api.util_gemini_api import GeminiApiUtil
```

#### 주요 AI 활용 메서드

##### 3.1 초기화
```python
def __init__(self):
    # ...
    self._gemini_api_util = GeminiApiUtil()
```
- **목적**: Gemini API 유틸리티 초기화
- **위치**: 라인 40

##### 3.2 전체 품질 평가 (validation_total_score)
```python
def validation_total_score(self, product: dict) -> dict:
    ai_analysis_img = self._octobot_product_util_image_service.get_ai_analysis_img_by_gemini(img_before)
    prompt = self.get_total_validation_prompt(prd_cate_name, prd_name_before, product_optimize_list, ai_analysis_img)
    ai_response = self._gemini_api_util.get_gemini_api_call(prompt)
    # JSON 응답 파싱
    response_dict = json.loads(cleaned_response)
    return response_dict
```
- **목적**: 모델하우스 콘텐츠 전체 품질 평가
- **위치**: 라인 524-578
- **AI 활용**: 상품 콘텐츠의 종합적인 품질을 AI로 평가하여 점수 및 등급 산출

##### 3.3 전체 검증 프롬프트 생성 (get_total_validation_prompt)
```python
def get_total_validation_prompt(self, prd_cate_name, prd_name_before, product_optimize, ai_analysis_img):
    prompt = f"""
    Persona: 당신은 이커머스 상품 콘텐츠 품질 평가 전문가(AI Assistant)입니다.
    
    Task: 주어진 상품 정보를 바탕으로 '마켓 모델하우스' 결과물의 품질을 자동으로 평가하고, 
    점수와 등급, 개선점을 포함한 결과를 JSON 형식으로 출력합니다.
    
    Evaluation Items & Scoring (Total 100 points):
    * m001 (썸네일 이미지, 5점)
    * m002 (마켓별 상품명, 25점)
    * m003 (메타 설명, 10점)
    * m004 (스마트스토어 판매자 태그, 15점)
    * m005 (쿠팡 키워드, 15점)
    * m007 (스마트스토어 상품 속성, 15점)
    * m009 (쿠팡 검색 필터, 15점)
    """
```
- **목적**: 상품 콘텐츠 품질 평가를 위한 상세 프롬프트 생성
- **위치**: 라인 580-672

### 4. OctobotModelhouseService (메인 서비스)

#### 파일 위치
`src/service/octobot/modelhouse/service_octobot_modelhouse.py`

#### AI 활용 구간

##### 4.1 품질 평가 프로세스 (process_validation_total_score)
```python
def process_validation_total_score(self, request_schema_list: list[OctobotModelhouseSaveRequestSchema]) -> dict:
    # AI를 통한 품질 평가 호출
    ai_response = self._octobot_modelhouse_util_validate.validation_total_score(product_section)
    
    # 결과 저장
    insert_result = self._history_json_repository.insert_history_json({
        "mall_id": f"{mall_id}|{prd_no}",
        "history_type": self.MODELHOUSE_VALIDATE_HISTORY_TYPE,
        "history_json": json.dumps(ai_response),
    })
```
- **목적**: 모델하우스 콘텐츠의 전체적인 품질을 AI로 평가
- **위치**: 라인 2004-2055
- **AI 활용**: 상품 콘텐츠 품질을 종합적으로 평가하고 결과를 DB에 저장

### 5. 마켓별 특화 최적화 서비스

#### 5.1 스마트스토어 (Shopn)
- **파일**: `src/service/octobot/modelhouse/optimizer/service_octobot_modelhouse_optimizer_shopn.py`
- **AI 활용**: 부모 클래스의 AI 기능 상속 사용
- **특화 기능**: 스마트스토어 특화 속성, SEO 메타 설명, 판매자 태그 최적화

#### 5.2 지마켓 (Gmarket)
- **파일**: `src/service/octobot/modelhouse/optimizer/service_octobot_modelhouse_optimizer_gmarket.py`
- **AI 활용**: 부모 클래스의 AI 기능 상속 사용
- **특화 기능**: 기본 구현만 제공

#### 5.3 옥션 (Auction)
- **파일**: `src/service/octobot/modelhouse/optimizer/service_octobot_modelhouse_optimizer_auction.py`
- **AI 활용**: 부모 클래스의 AI 기능 상속 사용
- **특화 기능**: 기본 구현만 제공

#### 5.4 11번가 (SK11st)
- **파일**: `src/service/octobot/modelhouse/optimizer/service_octobot_modelhouse_optimizer_sk11st.py`
- **AI 활용**: 부모 클래스의 AI 기능 상속 사용
- **특화 기능**: 기본 구현만 제공

## AI 활용 패턴 분석

### 1. 공통 AI 활용 패턴

#### 1.1 Gemini API 호출 패턴
```python
# 1. 프롬프트 생성
prompt = self.get_[purpose]_prompt(parameters)

# 2. AI API 호출
ai_response = self._gemini_api_util.get_gemini_api_call(prompt)

# 3. 응답 처리 및 로깅
self._trace_octobot_modelhouse_service.debug("AI 호출 결과", {}, {"prompt": prompt, "ai_response": ai_response})

# 4. 응답 파싱 및 예외 처리
try:
    parsed_result = self.parse_ai_response(ai_response)
    return parsed_result
except Exception as e:
    self._trace_octobot_modelhouse_service.warning("AI 응답 파싱 오류", {}, {"error": str(e)})
    return None
```

#### 1.2 AI 활용 주요 목적
1. **상품명 최적화**: 마켓별 검색 알고리즘에 최적화된 상품명 생성
2. **키워드 생성**: SEO 최적화를 위한 검색 키워드 추출
3. **품질 평가**: 최적화 결과에 대한 점수 및 등급 평가
4. **콘텐츠 검증**: 상품 콘텐츠의 적절성 및 완성도 검증

### 2. AI 프롬프트 특징

#### 2.1 구조화된 프롬프트
- **역할 정의**: "당신은 숙련된 SEO 전문가입니다"
- **명확한 요구사항**: 구체적인 출력 형식 및 제약 조건 명시
- **상품 정보 제공**: 카테고리, 상품명, 이미지 분석 결과 등 포함
- **응답 형식 지정**: JSON 형식 또는 텍스트 형식으로 명확히 지정

#### 2.2 마켓별 특화 프롬프트
- **쿠팡**: "쿠팡 상품 등록에 사용할 수 있는 검색 키워드"
- **스마트스토어**: "스마트스토어 특화 속성 및 태그"
- **범용**: "마켓(스마트스토어, 쿠팡 등) 상품 등록용"

### 3. AI 응답 처리 방식

#### 3.1 JSON 응답 파싱
```python
# 코드 블록 내 JSON 추출
match = re.search(r"```json\s*(\{.*?\})\s*```", ai_response, re.DOTALL)
if not match:
    raise Exception("JSON 블록 추출 실패")

json_str = match.group(1).strip()
parsed_json = json.loads(json_str)
```

#### 3.2 텍스트 응답 정제
```python
# 특수문자 제거 및 정제
seo_text = ai_response.strip()
seo_text = re.sub(r"[^가-힣a-zA-Z0-9\s]", "", seo_text)
```

### 4. 에러 처리 및 로깅

#### 4.1 표준 에러 처리 패턴
```python
try:
    ai_response = self._gemini_api_util.get_gemini_api_call(prompt)
    # 처리 로직
    return result
except Exception as e:
    self._trace_octobot_modelhouse_service.warning(
        "AI 호출 오류 메시지",
        {},
        {"ai_response": ai_response, "error": str(e)}
    )
    return None
```

#### 4.2 로깅 레벨
- **DEBUG**: 정상적인 AI 호출 결과
- **WARNING**: AI 응답 파싱 오류, 데이터 검증 실패
- **ERROR**: 시스템 레벨 오류

## AI 활용 흐름도

### 전체 프로세스
1. **상품 데이터 준비** → 2. **AI 데이터 생성** → 3. **마켓별 최적화** → 4. **품질 평가** → 5. **결과 저장**

### 상세 AI 호출 흐름
```
상품 정보 입력
    ↓
프롬프트 생성 (마켓별/목적별)
    ↓
Gemini API 호출
    ↓
응답 파싱 및 검증
    ↓
결과 데이터 구조화
    ↓
로깅 및 저장
```

## 주요 AI 기능별 정리

| 기능 | 파일 | 메서드 | AI 활용 목적 | 입력 데이터 | 출력 데이터 |
|------|------|--------|-------------|------------|------------|
| 점수 평가 | service_octobot_modelhouse_optimizer.py | get_optimize_data_score | SEO 점수 평가 | 최적화 전/후 데이터 | 0-100점 점수 |
| SEO 텍스트 생성 | service_octobot_modelhouse_optimizer.py | seo_text_ai_generate | 검색 키워드 생성 | 상품 정보 | 검색 키워드 텍스트 |
| 쿠팡 키워드 최적화 | service_octobot_modelhouse_optimizer_coupang.py | ai_optimize_prd_keyword | 쿠팡 특화 키워드 | 상품 정보 | 최적화된 키워드 |
| 전체 품질 평가 | service_octobot_modelhouse_util_validate.py | validation_total_score | 콘텐츠 품질 평가 | 모델하우스 데이터 | 종합 평가 결과 |

## 결론

모델하우스 시스템에서 AI(GeminiApiModel)는 다음과 같은 핵심 역할을 담당합니다:

1. **상품 최적화**: 마켓별 특성에 맞는 상품명, 키워드, 속성 최적화
2. **품질 관리**: 최적화 결과의 품질을 자동으로 평가하고 점수화
3. **SEO 최적화**: 검색 노출 향상을 위한 키워드 및 메타 데이터 생성
4. **검증 자동화**: 상품 콘텐츠의 적절성을 AI로 자동 검증

이러한 AI 활용을 통해 모델하우스 시스템은 수동 작업을 최소화하고, 일관된 품질의 상품 콘텐츠를 각 마켓에 최적화하여 제공할 수 있습니다.

## 개발 시 고려사항

1. **프롬프트 설계**: 명확하고 구체적인 프롬프트 작성
2. **응답 검증**: AI 응답의 형식 및 내용 검증 로직 필수
3. **에러 처리**: AI 호출 실패 시 적절한 대체 로직 구현
4. **로깅**: AI 호출 과정 및 결과에 대한 상세 로깅
5. **성능 최적화**: 불필요한 AI 호출 최소화 및 캐싱 활용

---
*생성일: 2025년*  
*분석 대상: pyapi-mp 프로젝트 modelhouse 관련 파일들*
