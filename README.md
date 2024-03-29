# 냥장고

<img src='https://user-images.githubusercontent.com/25821827/182103235-806974b9-abbe-47a5-bdee-496000df1232.png' width=450/>

## Index
  - [프로젝트 소개](#프로젝트-소개)
  - [팀 구성](#팀-구성)
  - [기술 스택](#기술-스택)
  - [트러블 슈팅](#트러블-슈팅)


## 프로젝트 소개

### 여러분들의 소중한 음식 재료들이 냉장고 안에서 잠자고 있나요?

- 재료들을 내 손안의 냉장고에 넣어 두고 관리하세요!
- 냥장고는 사용자의 냉장고에 들어있는 재료들을 가지고 만들 수 있는 여러 사람들이 올린 다양한 레시피를 구경해보세요!
- 귀찮음 많은 여러분들을 위한 쉽고 빠르고 정확한 검색 서비스를 제공합니다.

#### 냥장고 서비스영상 ▼
[냥장고(Nyangjanggo) **오늘 뭐 먹을지 고민하지 말자!**](https://youtu.be/i9tMu93nP-I)<br>
* 현재 서비스는 엘라스틱 서치 서버의 동작 비용으로 인해 비용문제 개선전까지 동작이 중단되었습니다.
#### 개발팀 노션 ▼
[팀 노션](https://frill-deposit-ff6.notion.site/Nyangjanggo-f7bdd5ad1aac4ffcba2dde4917823411)


재료기반 레시피 검색 사이트



냉장고에 있는 재료를 기반으로 할 수 있는 요리를 검색하고자 고민해본 프로젝트 입니다!
검색은 재료기반, 이름 기반 2가지를 지원하며,
냉장고에 보관된 재료를 등록해 직관적으로 검색할 수 있는 기능을 제공합니다!


## 팀 구성


| 이름     | GitHub                             | Position  |
| -------- | ---------------------------------- | --------- |
| 김윤교   | https://github.com/sugarghost          | 프론트엔드(리더) |
| 김형민   |       							 | 프론트엔드(슈퍼팀원) |
| 오재영   | https://github.com/ojy9612          | 백엔드(부리더)     |
| 김호균   | https://github.com/gyunih0 		| 백엔드     |
| 양찬우   | https://github.com/chanwooyang1        | 백엔드     |


## 기술 스택

### 코드 품질 관리
 - `ESLint`: 서로 다른 코딩 구조에 대해서 다수가 권장하는 방향성으로 통일하고자 사용했습니다.
 - `Prettier`: 협업을 진행하며 간단한 코드 스타일에 대한 포멧팅 통일을 위해 사용했습니다.
 - `TypeScript`: 데이터의 통합 규격 관리(` InterFace`) 및 코드 자동완성 지원을 통한 편리한 개발을 위해 사용했습니다.

### Style
 - `styled components`: css에 대한 별도 관리 및 복잡성을 방지하고 컴포넌트 단위 분리시 CSS를 포함 또는 효율적인 호출을 위해서 사용했습니다.
 - `Windi CSS`: 모든 CSS를 계산하고 적용시키는 작업은 익숙하지 않으면 시간이 많이 소요됬기에, 간단히 축약으로 css를 적용시키면서 전체적으로 적용된 CSS에 대해서 한눈에 알기 쉬운 형태로 사용하기 위해 사용했습니다.
   추가로 고려 가능한 라이브러리 중 `Tailwind CSS`가 존재했지만 `VITE`를 사용한 빠른 빌드 속도를 유지하고 싶었기에 성능적으로 좀더 고려 된 `Windi CSS`를 선택했습니다.
 - `sweetAlert2`: 사용자 알림에 대한 alert은 기본 기능을 사용하면 디자인이 투박하고 사용자 만족도를 떨어트린다고 판단해서 알람에 대한 디자인 적용을 위해 사용했습니다.

### 데이터 관리
 - `React Query`: 기존에 `Redux`를 사용한 데이터 및 통신 관리를 배웠지만, 보일러 플레이트의 문제와 `Redux`를 보조하기 위한 `Toolkit` 등의 추가 라이브러리 등 점점 프로젝트가 복잡해 지는 것을 느꼈습니다. `Redux`를 대체해 기능을 위한 코드 작업량을 줄이기 위해 Server와 통신되는 데이터는 React Query를 통해 관리하고 일부 반복 재 사용 가능성이 높은 데이터는 캐싱을 통해서 관리하도록 했습니다.
 - `Recoil`: 현재 프로젝트에서 내부 데이터의 전역관리가 차지하는 비중은 적기에 복잡하고 구성해야 할 것이 많은 `Redux` 대신 가볍게 사용 가능한 `Recoil`을 사용했습니다.
   초기에는 전역 비중이 적기에 라이브러리를 제거하자는 의견이 있었지만, 협업을 고려해 대중적으로 사용하는 `Recoil`을 유지시기키로 결정했습니다.
 - `React-Hook-Form + Yup`: 유동적으로 늘어나는 복잡한 Form 구조에서 개별 `state`에 대한 `watch`(감시)를 진행하기 위해 `react-hook-form`을 사용했습니다.
   또한 내부 데이터들에 대한 좀더 효율적인 유효성 검증을 위해 Yup에 대한 도입을 진행했습니다.

### Build
 - `VITE`: `ESM` 방식을 통한 브라우저의 번들러 역할 분담으로 특정 모듈 단위의 업데이트 및 빠른 빌드가 가능하기 때문에 사용했습니다.

### 통신
 - `Axios`: 서버와 통신하면서 인증, 전처리 및 전달된 응답값의 상태에 따른 별도 처리를 `interrupt` 처리를 위해서 `Axios`를 도입했습니다.

## 트러블 슈팅


수많은 트러블이 발생했지만,
대부분의 경우 라이브러리 이해 부족 등의 이슈로 남기기에도 부끄러운 자잘한 이슈였습니다.
때문에, 수많은 트러블에 대해서 이슈로 남기는 대신 공식 문서를 가까이 하고, 수많은 블로그 글보다 잘 정리된 한개의 자료를 깊게 이해하는 것이 더 나은 방법이라는 깨달음을 교훈으로 삼고자 합니다.

다만 오랜 시간을 붙잡았던 트러블에 대해서 이야기를 하자면,
`React-Hook-Form`을 사용하지 않고 `Form`을 직접 관리하려 했던 시간이었습니다.

`input`에 대해서 `onChange`를 걸고, `state`로 값을 관리하거나, `submit`시에 `ref`로 적용 시켜둔 `input`에서 값을 가져오는 등 여러가지 방법을 고려 했습니다.

결국 문제는 성능 관리였습니다.
`onChange` 및 `state`에서 변동사항이 발생하면, 유동적으로 늘어나는 `input`에 경우 전체 요소가 렌더링 영향을 받는 등의 문제가 발생했습니다.
컴포넌트를 분리시켜 일부 이벤트의 영향 범위를 제한하거나 `memo, callback` 등의 함수의 재사용성을 높이고자 했지만 오히려 예측하지 못하는 오류를 생성하거나 기존에 기능마저 망가지는 참사가 일어났습니다.

결국 시간은 한정적이기에 배움대신 프로젝트 구현을 목표로 `React-Hook-Form`을 도입했습니다.
기존에는 라이브러리 사용을 줄여보자는 생각에 `React-Hook-Form`을 사용하지 않았지만, 개발 시간이 오래 소요되고, 효율적인 프로젝트 진행을 위해 도입하게 되면서 해결된 문제였습니다.

