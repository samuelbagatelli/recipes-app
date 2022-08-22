import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import RenderWithRouterAndHistory from './RenderWithRouterAndHistory';

import HeaderProvider from '../../providers/HeaderProvider';

export default (component, route='/') => {
  return RenderWithRouterAndHistory(
    <HeaderProvider>{component}</HeaderProvider>, route,
  );
};