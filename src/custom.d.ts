declare module '*.svg' {
  import React = require('react');
  // svg를 컴포넌트로 가져와 활용하기 위해 사용
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  // Vite모듈에 Client.d.ts에서 svg가 중복되서 Client.d.ts에 export default src;을 비활성화 시켰음
  // 처음 소스코드 가져오면 패키지 설치 후 모듈에서 비활성화 필요
  // 우화하는 방법은 나중에 알아볼 예정...(너무 오래 걸림)
  export default src;
}
