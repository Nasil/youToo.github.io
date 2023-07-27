

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
