import React from 'react';
import LatestProducts from '../LatestProducts/LatestProducts';
const latestProducts = fetch('http://localhost:3000/latest-products')
.then(res=>res.json())
const Home = () => {
    return (
        <div>
            <LatestProducts latestProducts={latestProducts}></LatestProducts>
        </div>
    );
};

export default Home;