# RSC (React Server Component)? 
- Next.js 는 애플리케이션을 pages 단위로 나눈뒤, 서버단에서 HTML 페이지를 미리 렌더링 한 뒤 React 로 하여금 클라이언트 단에서 hydrated 하는 방식을 하게함.
- SSR 방식에서는 페이지가 아닌 컨포넌트를 정적으로 export 할 수가 없음. pages 하위에 있는 컴퍼넌트가 아닌 이상, SSR 관련 함수들을 사용할수 없음.
- RSC 는 이를 보안하는 개념으로 나왔으며 서버에서 한 차례 렌더링을 거친 뒤 클라이언트로 전달되게 된다.
- SSR의 장점이 필요한 곳에서는 RSC, CSR의 장점이 필요한 곳에서는 Client Component를 활용.

```
*.client.js(jsx, ts, tsx) : 클라이언트용 컴포넌트
*.sever.js(jsx, ts, tsx) : 서버용 컴포넌트
```
