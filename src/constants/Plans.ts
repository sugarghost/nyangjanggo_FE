/* eslint-disable @typescript-eslint/tslint/config */
export const STARTER_CREDIT = 100;
export const BASIC_CREDIT = 350;

export const STARTER_PERIOD = 7;
export const UNLIMITED_PERIOD = 30;
export const PLAN_TITLE = {
  STARTER: "스타터",
  BASIC: "베이직",
  PRO: "프로",
  IMAGE_TRANSLATION_API: "이미지 번역 API",
};

/**
 * 서비스이름_(제한/무제한)_(제약사항)
 * 제약 사항 종류 : 기간, 기능차등, 용량 제한, 건수 제한
 */

export enum TAX_TYPE {
  SURTAX_PERCENT = "SURTAX_PERCENT",
}

export enum PROMOTION_TYPE {
  BONUS_AMOUNT = "BONUS_AMOUNT", // 정량 보너스
  BONUS_PERCENT = "BONUS_PERCENT", // 퍼센트 보너스
  DISCOUNT_AMOUNT = "DISCOUNT_AMOUNT", // 정량 할인
  DISCOUNT_PERCENT = "DISCOUNT_PERCENT", // 퍼센트 할인
  BONUS_FEATURE = "BONUS_FEATURE",
}

export enum PROMOTION_CONDITION_TYPE {
  BILLING_CYCLE = "BILLING_CYCLE", // 결제 주기
  LICENSE_PERIOD = "LICENSE_PERIOD", // 라이센스 유효기간
}

export enum LICENSE_FEATURE {
  EDITOR = "EDITOR",
  API = "API",
  HOSTING = "HOSTING",
}

export enum LICENSE_LIMIT_TYPE {
  TIME = "TIME",
  CREDIT = "CREDIT",
  COUNTS = "COUNT",
  MEGABYTES = "MEGABYTES",
}

export enum PLAN_OBJECTIVE {
  STARTER = "STARTER",
  PURCHASE = "PURCHASE",
  COMPENSATION = "COMPENSATION",
}

export enum PLAN_SCOPE {
  STUDIO = "STUDIO",
}

export interface ILicenseLimit {
  type: LICENSE_LIMIT_TYPE;
  period: number; // 일/분/시간 단위 제한
  value: number;
}

export interface ILicense {
  features: LICENSE_FEATURE[];
  period: number; // 요금제 활성화 기간
  limits: ILicenseLimit[];
}

//공개 비공개 여부
//한도 초과에 대한 처리 방식 / 제한 또는 집계
export interface IPlan {
  id: string; // 요금제 ID
  title: string; // 요금제 이름
  descriptions: string[]; // 요금제 설명
  amount: number; // 요금제 단가 (부가세 제외)
  period: number; // 요금제 기본 갱신 기간
  countryCode: string; // 요금제 적용 지역 (국가코드 ISO 3166-1 2자리)
  currencyCode: string; // 통화 코드 (국가별 통화 기호 ISO-4217 3자리)
  objective: PLAN_OBJECTIVE; // 요금제 목표
  scopes: PLAN_SCOPE[]; // 요금제 공개 범위
  taxes: {
    // 세금
    type: TAX_TYPE;
    value: number;
  }[];
  licenses: ILicense[]; // 라이센스
  promotions: {
    // 할인
    type: PROMOTION_TYPE;
    value: number;
    condition: {
      type: PROMOTION_CONDITION_TYPE;
      value: number;
    }[];
  }[];
  activationTime: number; // 요금제 활성화 시각
  expirationTime: number; // 요금제 만료 시각
  createTime: number;
  updateTime: number;
}

interface IActivePlans {
  id: string; // 활성화 요금제 ID
  userId: string; // 사용자 ID
  planId: string; // 요금제 ID
  licenses: ILicense[]; // 라이센스
  activationTime: number; // 요금제 활성화 시각
  expirationTime: number; // 요금제 만료 시각
  createTime: number;
  updateTime: number;
}

export const PLANS_DATA: IPlan[] = [
  {
    id: "1da746f4c12140e88de7422f785784c4",
    countryCode: "KR",
    descriptions: ["오후스튜디오 첫 가입 시", "별도 신청 절차 없이 자동 지급"],
    scopes: [PLAN_SCOPE.STUDIO],
    period: 604800000,
    createTime: 1642016622230,
    updateTime: 1642016622230,
    promotions: [],
    licenses: [
      {
        features: [LICENSE_FEATURE.EDITOR],
        period: 604800000,
        limits: [
          {
            type: LICENSE_LIMIT_TYPE.TIME,
            value: 604800000,
            period: 604800000,
          },
        ],
      },
    ],
    objective: PLAN_OBJECTIVE.STARTER,
    expirationTime: 4102444800000,
    amount: 0,
    currencyCode: "KRW",
    taxes: [],
    title: "스타터",
    activationTime: 0,
  },
  {
    id: "fb44560eecff49d281044f2cca8204d5",
    countryCode: "KR",
    descriptions: ["5,000장씩 1개월(30일)간 이용 가능"],
    scopes: [PLAN_SCOPE.STUDIO],
    period: 2592000000,
    createTime: 1644308511613,
    updateTime: 1644308511613,
    promotions: [],
    licenses: [
      {
        features: [LICENSE_FEATURE.EDITOR],
        period: 2592000000,
        limits: [
          {
            type: LICENSE_LIMIT_TYPE.COUNTS,
            value: 5000,
            period: 2592000000,
          },
        ],
      },
    ],
    objective: PLAN_OBJECTIVE.PURCHASE,
    expirationTime: 1648768499000,
    amount: 60000,
    currencyCode: "KRW",
    taxes: [
      {
        type: TAX_TYPE.SURTAX_PERCENT,
        value: 10,
      },
    ],
    title: "프로 1개월 이용권",
    activationTime: 0,
  },
  {
    id: "a7b7f15695ab4a4b8c214376f52ac2b8",
    countryCode: "KR",
    descriptions: ["30일 주기로 5,000장씩 6개월(180일)간 이용 가능"],
    scopes: [PLAN_SCOPE.STUDIO],
    period: 15552000000,
    createTime: 1644308511613,
    updateTime: 1644308511613,
    promotions: [
      {
        type: PROMOTION_TYPE.DISCOUNT_PERCENT,
        value: 20,
        condition: [],
      },
    ],
    licenses: [
      {
        features: [LICENSE_FEATURE.EDITOR],
        period: 2592000000,
        limits: [
          {
            type: LICENSE_LIMIT_TYPE.COUNTS,
            value: 5000,
            period: 2592000000,
          },
        ],
      },
    ],
    objective: PLAN_OBJECTIVE.PURCHASE,
    expirationTime: 1648768499000,
    amount: 360000,
    currencyCode: "KRW",
    taxes: [
      {
        type: TAX_TYPE.SURTAX_PERCENT,
        value: 10,
      },
    ],
    title: "프로 6개월 이용권",
    activationTime: 0,
  },
  {
    id: "c83f6d8d70594ff19bf30c7cd03cb74d",
    countryCode: "KR",
    descriptions: ["30일 주기로 5,000장씩 12개월(365일)간 이용 가능"],
    scopes: [PLAN_SCOPE.STUDIO],
    period: 31104000000,
    createTime: 1644308511613,
    updateTime: 1644308511613,
    promotions: [
      {
        type: PROMOTION_TYPE.DISCOUNT_PERCENT,
        value: 30,
        condition: [],
      },
    ],
    licenses: [
      {
        features: [LICENSE_FEATURE.EDITOR],
        period: 2592000000,
        limits: [
          {
            type: LICENSE_LIMIT_TYPE.COUNTS,
            value: 5000,
            period: 2592000000,
          },
        ],
      },
    ],
    objective: PLAN_OBJECTIVE.PURCHASE,
    expirationTime: 1648768499000,
    amount: 720000,
    currencyCode: "KRW",
    taxes: [
      {
        type: TAX_TYPE.SURTAX_PERCENT,
        value: 10,
      },
    ],
    title: "프로 12개월 이용권",
    activationTime: 0,
  },
  {
    id: "11c10260cee540ae982df420d0f171ca",
    countryCode: "KR",
    descriptions: [
      "5,000장씩 1개월간 이용 가능",
      "오후스튜디오 에디터 이용권 포함",
      "*사전 계약된 솔루션 회원 전용 요금제",
    ],
    scopes: [PLAN_SCOPE.STUDIO],
    period: 2592000000,
    createTime: 1641534587884,
    updateTime: 1641534587884,
    promotions: [
      {
        type: PROMOTION_TYPE.DISCOUNT_PERCENT,
        value: 50,
        condition: [],
      },
    ],
    licenses: [
      {
        features: [LICENSE_FEATURE.API],
        period: 2592000000,
        limits: [
          {
            type: LICENSE_LIMIT_TYPE.TIME,
            value: 2592000000,
            period: 2592000000,
          },
        ],
      },
    ],
    objective: PLAN_OBJECTIVE.PURCHASE,
    expirationTime: 1648768499000,
    amount: 120000,
    currencyCode: "KRW",
    taxes: [
      {
        type: TAX_TYPE.SURTAX_PERCENT,
        value: 10,
      },
    ],
    title: "API 1개월 이용권",
    activationTime: 0,
  },
];

export const getMonthlyPrice = (plan: IPlan) => {
  const periodMonths = Math.floor(plan.period / 24 / 60 / 60 / 1000 / 30);
  const promotion = Array.from(plan.promotions).shift();
  const originalPriceWithTax = getOriginalPriceWithTax(plan);

  if (promotion && promotion.type === PROMOTION_TYPE.DISCOUNT_PERCENT) {
    return (
      (originalPriceWithTax * (100 - promotion.value)) / 100 / periodMonths
    );
  } else {
    return originalPriceWithTax;
  }
};

export const getDiscountedPrice = (plan: IPlan) => {
  const promotion = Array.from(plan.promotions).shift();
  const originalPriceWithTax = getOriginalPriceWithTax(plan);

  if (promotion && promotion.type === PROMOTION_TYPE.DISCOUNT_PERCENT) {
    return (originalPriceWithTax * (100 - promotion.value)) / 100;
  } else {
    return originalPriceWithTax;
  }
};

export const getOriginalPriceWithTax = (plan: IPlan) => {
  const tax = Array.from(plan.taxes).shift() || { value: 0 };

  return (plan.amount * (100 + tax.value)) / 100;
};
