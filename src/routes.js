import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Cart from './pages/cart';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Cart} path="/cart" />
        </BrowserRouter>
    )
}

export default Routes;