# 비동기 
https://nextjs.org/docs/app/building-your-application/data-fetching
- Next.js App Router를 사용하면 함수를 비동기로 표시하고 Promise에 대한 대기를 사용하여 React 구성 요소에서 직접 데이터를 가져올 수 있습니다.
    - promise ? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    - Fetch ? https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- 데이터 가져오기는 fetch() 웹 API 및 React 서버 구성 요소 위에 구축됩니다. 
- Cache : fetch() 요청은 자동으로 캐시되고 중복 제거됩니다. 즉, 동일한 요청을 두 번 하면 두 번째 요청은 첫 번째 요청의 결과를 재사용합니다.

```js
import dynamic from 'next/dynamic';
import {use} from "react";
const CartItem = dynamic(() => import('./data'));

interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export default function Cart() {
    let products: IProduct[] = use(getData())

    return (
        <div>
            <h1 className="title">Cart</h1>
            <CartItem prdName={products[0].title} price={products[0].price}/>
            <CartItem prdName={products[2].title} price={products[2].price}/>
            <CartItem prdName={products[1].title} price={products[1].price}/>
            <CartItem prdName={products[0].title} price={products[0].price}/>
        </div>
    )
}

export async function getData() {
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
    return data.products
}
```
