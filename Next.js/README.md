# Next.js 란?
- React 기반의 SSR(Server Side Rendering) 프레임워크
- Next.js는 SEO에 불리한 React, CSR의 문제점을 해결하여 SEO에 도움을 줄 뿐 아니라 개발자의 작업 환경을 더욱 편리하게 해주는 다양한 기능을 제공
- React.js는 라이브러리이고, Next.js는 React.js의 프레임워크이다. 
```
npx create-next-app@latest
npm run dev
```

### Nex.js 컴포넌트 종류
- server component
  - HTML에 자바스크립트 기능넣기 불가능
  - useState, useEffect 사용불가
  - 로딩 속도가 매우 빠름
  - SEO 노출에 이점
- client componet // 'use client'
  - HTML에 자바스크립트 기능넣기 가능
  - useState, useEffect 가능
  - 로딩 느림 (hydration 필요)

