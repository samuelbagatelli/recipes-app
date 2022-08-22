import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import LoginProvider from './context/LoginProvider';
import RecipesProvider from './context/RecipesProvider';
import HeaderProvider from './providers/HeaderProvider';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <LoginProvider>
      <RecipesProvider>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </RecipesProvider>
    </LoginProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
