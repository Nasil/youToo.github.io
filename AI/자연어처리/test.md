# GeminiApiUtil 사용 현황 분석

> 생성일: 2025-10-14
> 분석 대상: `/Users/nshyun/workspace/pyapi-mp` 전체 프로젝트

## 📊 개요

**GeminiApiUtil**은 Google Vertex AI의 Gemini 모델을 호출하기 위한 유틸리티 클래스입니다.
- 기본 모델: `gemini-2.5-flash`
- 주요 기능: AI 텍스트 생성, 이미지 분석, 카테고리 분류, 검증 등
- Failover 지원: OpenAI, Claude로 자동 전환 가능

**총 사용 파일 수: 35개**

---

## 📑 목차

1. [SNS 서비스 (2개)](#1-sns-서비스)
2. [Octobot Product 서비스 (20개)](#2-octobot-product-서비스)
3. [Octobot Modelhouse 서비스 (2개)](#3-octobot-modelhouse-서비스)
4. [유틸리티 클래스 (2개)](#4-유틸리티-클래스)
5. [테스트 파일 (9개)](#5-테스트-파일)

---

## 1. SNS 서비스

| 파일 경로 | 클래스명 | 역할 | 사용 메서드 |
|---------|---------|-----|-----------|
| `src/service/sns/service_sns_prompt.py` | `SnsPromptService` | SNS 프롬프트 템플릿 관리 및 AI 캡션 생성 | `get_gemini_api_call()` |
| `src/service/sns/service_sns_content_asset.py` | `SnsContentAssetService` | SNS 콘텐츠(이미지/비디오) 생성 및 관리 | `get_gemini_api_call()` |

### 상세 설명

#### SnsPromptService
- **목적**: SNS용 AI 캡션 자동 생성
- **주요 기능**:
  - 이미지 분석 기반 캡션 생성
  - 상품 정보와 결합하여 마케팅 문구 작성
  - 프롬프트 템플릿 관리
- **사용 예시**: 상품 이미지를 분석하여 Instagram, Facebook 등의 게시물 캡션 자동 생성

#### SnsContentAssetService
- **목적**: SNS 콘텐츠 자동 생성
- **주요 기능**:
  - 이미지 분석 및 설명 생성
  - 비디오 스크립트 생성
  - 콘텐츠 최적화
- **사용 예시**: 상품 이미지에서 AI가 자동으로 설명 텍스트 생성

---

## 2. Octobot Product 서비스

### 2.1 메인 서비스

| 파일 경로 | 클래스명 | 역할 | 사용 메서드 |
|---------|---------|-----|-----------|
| `src/service/octobot/product/service_octobot_product_common.py` | `OctobotProductCommonService` | 옥토봇 상품 공통 처리 서비스 | `get_gemini_api_call()` |
| `src/service/octobot/product/optimizer/service_octobot_product_optimizer.py` | `OctobotProductOptimizerService` | 상품 정보 최적화 (제목, 설명 등) | `get_gemini_api_call()` |

### 2.2 Mplus 관련 서비스

| 파일 경로 | 클래스명 | 역할 | 사용 메서드 |
|---------|---------|-----|-----------|
| `src/service/octobot/product/mplus/service_octobot_product_mplus.py` | `OctobotProductMplusService` | 마켓플러스 상품 처리 메인 서비스 | `get_gemini_api_call()` |
| `src/service/octobot/product/mplus/service_octobot_product_mplus_category.py` | `OctobotProductMplusCategoryService` | 카테고리 자동 매칭 | `get_gemini_api_call()` |
| `src/service/octobot/product/mplus/service_octobot_product_mplus_validator.py` | `OctobotProductMplusValidator` | Mplus 상품 검증 | `get_gemini_api_call()` |
| `src/service/octobot/product/mplus/service_octobot_product_mplus_retry.py` | `OctobotProductMplusRetryService` | Mplus 재시도 처리 | `get_gemini_api_call()` |
| `src/service/octobot/product/mplus/aliexpress/service_octobot_product_mplus_aliexpress.py` | `OctobotProductMplusAliexpressService` | 알리익스프레스 Mplus 처리 | `get_gemini_api_call()` |

### 2.3 Standard 서비스

| 파일 경로 | 클래스명 | 역할 | 사용 메서드 |
|---------|---------|-----|-----------|
| `src/service/octobot/product/standard/service_octobot_product_standard_category.py` | `OctobotProductStandardCategoryService` | 표준 카테고리 매핑 | `get_gemini_api_call()` |

### 2.4 Market Sync 서비스

| 파일 경로 | 클래스명 | 역할 | 사용 메서드 |
|---------|---------|-----|-----------|
| `src/service/octobot/product/market/shopn/service_octobot_product_market_shopn_sync.py` | `OctobotProductMarketShopnSyncService` | 쇼핑엔 상품 동기화 | `get_gemini_api_call()` |
| `src/service/octobot/product/market/kakao/service_octobot_product_market_kakao_sync.py` | `OctobotProductMarketKakaoSyncService` | 카카오 상품 동기화 | `get_gemini_api_call()` |

### 2.5 Validate 서비스

| 파일 경로 | 클래스명 | 역할 | 사용 메서드 |
|---------|---------|-----|-----------|
| `src/service/octobot/product/validate/ably/service_octobot_product_validate_ably.py` | `OctobotProductValidateAblyService` | 에이블리 상품 검증 | `get_gemini_api_call()` |
| `src/service/octobot/product/validate/aliexpress/service_octobot_product_validate_aliexpress.py` | `OctobotProductValidateAliexpressService` | 알리익스프레스 상품 검증 | `get_gemini_api_call()` |
| `src/service/octobot/product/validate/coupang/service_octobot_product_validate_coupang.py` | `OctobotProductValidateCoupangService` | 쿠팡 상품 검증 | `get_gemini_api_call()` |
| `src/service/octobot/product/validate/musinsa/service_octobot_product_validate_musinsa.py` | `OctobotProductValidateMusinsaService` | 무신사 상품 검증 | `get_gemini_api_call()` |
| `src/service/octobot/product/validate/shopn/service_octobot_product_validate_shopn.py` | `OctobotProductValidateShopnService` | 쇼핑엔 상품 검증 | `get_gemini_api_call()` |
| `src/service/octobot/product/validate/ssg/service_octobot_product_validate_ssg.py` | `OctobotProductValidateSsgService` | SSG 상품 검증 | `get_gemini_api_call()` |

### 2.6 Util 서비스

| 파일 경로 | 클래스명 | 역할 | 사용 메서드 |
|---------|---------|-----|-----------|
| `src/service/octobot/product/util/service_octobot_product_util_image.py` | `OctobotProductUtilImageService` | 상품 이미지 AI 분석 | `get_gemini_api_call()` |
| `src/service/octobot/product/util/service_octobot_product_util_message.py` | `OctobotProductUtilMessageService` | 에러 메시지 AI 분석 및 자동응답 | `get_gemini_api_call()` |
| `src/service/octobot/product/util/service_octobot_product_util_market_api_failure.py` | `OctobotProductMarketApiFailureService` | 마켓 API 실패 분석 | `get_gemini_api_call()` |

### 상세 설명

#### OctobotProductOptimizerService
- **목적**: 상품 정보 AI 최적화
- **주요 기능**:
  - 상품 제목 최적화
  - 상품 설명 개선
  - 검색 키워드 생성
  - 카테고리 추천
- **사용 예시**: EC 상품명 "반팔티"를 "2025 여름 신상 남녀공용 데일리 반팔 티셔츠"로 최적화

#### OctobotProductMplusCategoryService
- **목적**: 마켓별 카테고리 자동 매핑
- **주요 기능**:
  - 상품 정보 분석하여 적합한 카테고리 추천
  - 마켓별 카테고리 구조에 맞게 변환
  - 카테고리 매핑 정확도 검증
- **사용 예시**: 쇼핑몰 카테고리 "의류 > 여성의류 > 원피스"를 쿠팡 카테고리 체계로 자동 변환

#### OctobotProductUtilImageService
- **목적**: 상품 이미지 AI 분석
- **주요 기능**:
  - 이미지 내용 분석 (색상, 스타일, 재질 등)
  - 이미지 품질 평가
  - 이미지 기반 태그 생성
  - 부적절한 이미지 감지
- **사용 예시**: 상품 이미지를 분석하여 "빨간색 원피스, 플로럴 패턴, 여름용" 등의 태그 자동 생성

#### OctobotProductUtilMessageService
- **목적**: 마켓 에러 메시지 AI 분석
- **주요 기능**:
  - 마켓 API 에러 메시지 해석
  - 해결 방법 제안
  - 자동 재시도 가능 여부 판단
  - 사용자 친화적 메시지 생성
- **사용 예시**: 쿠팡 에러 "상품명이 너무 짧습니다" → "상품명을 10자 이상으로 작성해주세요"

#### Validate 서비스들
- **목적**: 마켓별 상품 등록 규정 검증
- **주요 기능**:
  - 금지어 검사
  - 필수 정보 누락 확인
  - 규격 준수 여부 검증
  - 마켓 정책 위반 감지
- **사용 예시**: 쿠팡 등록 전 "정품 보장" 문구 사용 가능 여부 AI 검증

---

## 3. Octobot Modelhouse 서비스

| 파일 경로 | 클래스명 | 역할 | 사용 메서드 |
|---------|---------|-----|-----------|
| `src/service/octobot/modelhouse/service_octobot_modelhouse_optimizer.py` | `OctobotModelhouseOptimizerService` | 모델하우스 상품 최적화 | `get_gemini_api_call()` |
| `src/service/octobot/modelhouse/util/service_octobot_modelhouse_util_validate.py` | `OctobotModelhouseUtilValidateService` | 모델하우스 검증 | `get_gemini_api_call()` |

### 상세 설명

#### OctobotModelhouseOptimizerService
- **목적**: 모델하우스(샘플 상품) 정보 AI 최적화
- **주요 기능**:
  - 샘플 상품 설명 생성
  - 모델하우스용 이미지 분석
  - 카테고리 자동 매핑
- **사용 예시**: 고객사 시연용 샘플 상품 데이터 자동 생성

---

## 4. 유틸리티 클래스

| 파일 경로 | 클래스명 | 역할 | 사용 메서드 |
|---------|---------|-----|-----------|
| `src/util/api/util_gemini_api.py` | `GeminiApiUtil` | Gemini API 호출 유틸리티 (본체) | `get_gemini_api_call()` |
| `src/util/api/util_ai_aggregator_api.py` | `AIAggregator` | 다중 AI API 통합 관리자 | `gemini.get_gemini_api_call()` |
| `src/util/util_phpparser.py` | `PhpParserUtil` | PHP 코드 파싱 유틸리티 | `get_gemini_api_call()` |

### 상세 설명

#### GeminiApiUtil
- **목적**: Google Vertex AI Gemini API 호출 래퍼
- **주요 기능**:
  - API 인증 및 호출
  - 에러 핸들링
  - Failover 지원 (OpenAI, Claude)
  - 성능 모니터링 (응답 시간, 토큰 비용)
  - 슬랙 알림
- **설정 가능 파라미터**:
  - `model_name`: 사용할 모델 선택
  - `enable_failover`: 실패 시 자동 전환
  - `temperature`: 창의성 조절 (0~1)
  - `max_output_tokens`: 최대 출력 토큰 수
  - `response_mime_type`: 응답 형식

#### AIAggregator
- **목적**: Claude, Gemini, OpenAI API 통합 인터페이스
- **주요 기능**:
  - 단일 인터페이스로 여러 AI API 사용
  - 모델별 자동 라우팅
  - 통합 에러 처리
- **사용 예시**: 
  ```python
  aggregator = AIAggregator()
  result = aggregator.get_completion(prompt, GeminiApiModel.GEMINI_FLASH_2_5)
  ```

#### PhpParserUtil
- **목적**: PHP 코드 분석 및 변환
- **주요 기능**:
  - PHP 코드를 Python으로 변환
  - PHP 문법 분석
  - 레거시 코드 이해
- **사용 예시**: 기존 PHP 쇼핑몰 코드를 Python으로 마이그레이션

---

## 5. 테스트 파일

| 파일 경로 | 역할 |
|---------|-----|
| `tests/util/api/test_util_gemini_api.py` | GeminiApiUtil 단위 테스트 |
| `tests/util/test_util_gemini_api_failover.py` | Failover 기능 테스트 |
| `tests/service/test_sns_contents_caption.py` | SNS 캡션 생성 테스트 |
| `tests/service/octobot/product/util/test_service_octobot_product_util_message.py` | 메시지 처리 테스트 |
| `tests/service/octobot/product/sync/coupang/test_service_octobot_product_sync_coupang.py` | 쿠팡 동기화 테스트 |
| `tests/service/octobot/product/sync/shopn/test_service_octobot_product_sync_shopn.py` | 쇼핑엔 동기화 테스트 |
| `tests/ai/octobot/few_shot/print__prompt.py` | AI 프롬프트 테스트 |
| `tests/runner_octobot_order.py` | 주문 관련 통합 테스트 |
| `tests/runner_octobot.py` | 옥토봇 통합 테스트 |

---

## 📈 주요 사용 패턴

### 1. 기본 사용 패턴
```python
from src.util.api.util_gemini_api import GeminiApiUtil

gemini = GeminiApiUtil()
result = gemini.get_gemini_api_call(prompt="상품 설명을 작성해주세요")
```

### 2. 모델 지정 패턴
```python
from src.util.api.util_gemini_api import GeminiApiUtil, GeminiApiModel

gemini = GeminiApiUtil()
result = gemini.get_gemini_api_call(
    prompt="복잡한 분석이 필요합니다",
    model_name=GeminiApiModel.GEMINI_FLASH_2_5
)
```

### 3. Failover 비활성화 패턴
```python
result = gemini.get_gemini_api_call(
    prompt="간단한 작업",
    enable_failover=False  # Gemini만 사용
)
```

### 4. 파라미터 커스터마이징
```python
result = gemini.get_gemini_api_call(
    prompt="창의적인 글 작성",
    temperature=0.8,  # 더 창의적
    max_output_tokens=2048,
    response_mime_type="application/json"  # JSON 응답
)
```

---

## 🎯 주요 사용 목적별 분류

### 1. 상품 정보 최적화 (12개 파일)
- 제목, 설명, 키워드 생성
- 이미지 분석 기반 태그 생성
- 검색 최적화

### 2. 카테고리 자동 매핑 (3개 파일)
- 마켓별 카테고리 구조 이해
- 상품 정보 기반 카테고리 추천
- 매핑 정확도 검증

### 3. 검증 및 오류 분석 (9개 파일)
- 마켓 규정 준수 검증
- 에러 메시지 해석
- 자동 수정 제안

### 4. 콘텐츠 생성 (2개 파일)
- SNS 캡션 생성
- 마케팅 문구 작성
- 이미지 설명 생성

### 5. 기타 유틸리티 (9개 파일)
- 테스트 및 모니터링
- 코드 분석
- 통합 테스트

---

## 🔧 GeminiApiUtil 주요 기능

### 1. API 호출
- **메서드**: `get_gemini_api_call()`
- **파라미터**:
  - `prompt`: 입력 텍스트
  - `model_name`: 모델 선택 (기본: gemini-2.5-flash)
  - `enable_failover`: 실패 시 자동 전환
  - `temperature`: 창의성 (0~1)
  - `top_p`: 토큰 샘플링 (0~1)
  - `max_output_tokens`: 최대 출력 길이
  - `response_mime_type`: 응답 형식

### 2. Failover 메커니즘
1. **1차 시도**: Gemini API
2. **2차 시도**: OpenAI GPT-4
3. **3차 시도**: Claude Sonnet

### 3. 모니터링
- API 호출 시간 측정
- 토큰 사용량 추적
- 에러 발생 시 슬랙 알림
- ES 로그 저장

### 4. 지원 모델
| 모델명 | 설명 | 상태 |
|-------|------|------|
| `gemini-2.5-flash` | 최신 고속 모델 (기본) | ✅ 활성 |
| `gemini-2.0-flash-001` | 플래시 2.0 | ⚠️ 2026년 2월 종료 예정 |
| `gemini-2.0-flash-lite-001` | 경량 모델 | ⚠️ 2026년 2월 종료 예정 |
| `gemini-1.5-pro` | 프로 모델 | ❌ 사용 중단 |
| `gemini-1.5-flash` | 플래시 1.5 | ❌ 사용 중단 |

---

## 📊 통계

- **총 사용 파일**: 35개
- **서비스 파일**: 24개
- **테스트 파일**: 9개
- **유틸리티 파일**: 2개

### 도메인별 분포
- **Octobot Product**: 20개 (57%)
- **테스트**: 9개 (26%)
- **SNS**: 2개 (6%)
- **Octobot Modelhouse**: 2개 (6%)
- **유틸리티**: 2개 (6%)

### 마켓별 분포 (Validate/Sync 서비스)
- 쿠팡: 2개
- 쇼핑엔: 2개
- 카카오: 1개
- 에이블리: 1개
- 알리익스프레스: 2개
- 무신사: 1개
- SSG: 1개

---

## 💡 Best Practices

### 1. Failover 사용
- 중요한 작업: `enable_failover=True` (기본값)
- 빠른 응답 필요: `enable_failover=False`

### 2. Temperature 설정
- 사실 기반 작업 (검증, 분류): `temperature=0`
- 창의적 작업 (마케팅 문구): `temperature=0.7~1.0`

### 3. 모델 선택
- 일반 작업: `GEMINI_FLASH_2_5` (기본값)
- 빠른 응답 필요: `GEMINI_FLASH_2_LITE`
- 고품질 필요: `GEMINI_PRO` (비용 높음)

### 4. 에러 처리
```python
try:
    result = gemini.get_gemini_api_call(prompt)
    if result is None:
        # Failover도 실패한 경우
        logger.error("All AI APIs failed")
except Exception as e:
    logger.error(f"AI call error: {e}")
```

---

## 🔗 관련 문서

- [Vertex AI 문서](https://cloud.google.com/vertex-ai/docs)
- [Gemini API 가이드](https://ai.google.dev/docs)
- 내부 Wiki: https://wiki.simplexi.com/pages/viewpage.action?pageId=2710992491

---

## 📝 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2025-10-14 | 문서 최초 작성 |
| 2025-10-14 | GeminiApiUtil 사용 현황 분석 완료 (35개 파일) |

---

**작성자**: AI Assistant  
**최종 업데이트**: 2025-10-14

