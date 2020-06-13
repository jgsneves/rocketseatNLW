//por que o BrowserRouter? ele é o mais utilizado quando fazemos
//navegação de rotas através do navegador
import { Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import CreatePoint from './pages/createPoint';


const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path='/' exact/>
            <Route component={CreatePoint} path='/create-point'/>
        </BrowserRouter>
    )
}

export default Routes;