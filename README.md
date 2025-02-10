# 🌏 Seoul Tourism Project (Frontend)

## 🏙 프로젝트 소개

**Seoul Tourism Project**는 외국인을 위한 서울 여행 추천 웹사이트입니다. 사용자는 서울의 주요 관광지, 액티비티, 거리 등을 탐색하고, 개인 일정에 맞춰 여행 계획을 세울 수 있습니다. 다양한 언어 지원과 지도 기능을 제공하여 글로벌 사용자 편의성을 극대화합니다.

## 🚀 주요 기능

- **여행지 정보 제공**: 서울의 전통 명소(고궁, 한옥마을) 및 현대 명소(남산타워, 롯데월드) 상세 정보 제공
- **찜 기능**: 관심 있는 여행지를 찜 목록에 저장 및 관리 (debounce로 API 최적화)
- **일정 관리**: 캘린더 및 타임테이블 기능을 활용한 여행 일정 관리
- **굿즈 상점**: 여행 기념품을 장바구니에 추가하고 결제 가능
- **다국어 지원**: 한국어, 영어, 일본어, 중국어 등 주요 언어 지원 (Google Translation API 활용)
- **맵 지원**: Google Maps API를 활용한 위치 정보 제공 및 다국어 번역 기능

## 🛠 기술 스택

### 📌 프론트엔드

- **프레임워크 & 라이브러리**: React, Redux Toolkit, React Query, Styled-components
- **스타일링**: Styled-components
- **페이지 라우팅**: react-router-dom
- **데이터 요청**: Axios
- **아이콘**: Font Awesome (@fortawesome/react-fontawesome)
- **캘린더 기능**: react-calendar

### 🔗 API 및 외부 서비스

- **결제 시스템**: 네이버 페이, 카카오 페이 API
- **번역 기능**: Google Translation API
- **지도 기능**: Google Maps API

## 💻 설치 및 실행 방법

### 🚀 프로젝트 실행

1. 저장소 클론
   ```bash
   git clone https://github.com/SeoulTourism-Project/FE.git
   cd FE
   ```
2. 패키지 설치
   ```bash
   npm install
   ```
3. 개발 서버 실행
   ```bash
   npm start
   ```
4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 📦 필수 패키지 설치

이 프로젝트를 실행하기 위해 필요한 주요 패키지들은 다음과 같습니다:

```bash
npm install react-calendar react-router axios redux react-redux @reduxjs/toolkit styled-components tanstack-query @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

## 📌 프로젝트 구조

```
📂 src
 ┣ 📂 components  # 재사용 가능한 컴포넌트
 ┣ 📂 pages       # 주요 페이지 컴포넌트
 ┣ 📂 store       # Redux 상태 관리
 ┣ 📂 api         # Axios API 요청 정의
 ┣ 📂 assets      # 이미지 및 정적 파일
 ┣ 📂 utils       # 공통 유틸리티 함수
 ┗ 📜 App.js      # 메인 애플리케이션 파일
```

## 🤝 기여 방법

1. 이슈를 확인하고 새로운 브랜치를 생성합니다.
2. 기능을 개발한 후 PR(Pull Request)을 생성합니다.
3. 코드 리뷰 후 반영하여 병합합니다.

## 📜 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
