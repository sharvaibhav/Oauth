import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';
import Home from '../Components/home';
import Login from '../Components/Login';

export default ()=>(
  <BrowserRouter>
  <div>
      <Route path='/login' exact component={Login} />
      <Route path='/home' exact component={Home} />
  </div>
  </BrowserRouter>
);