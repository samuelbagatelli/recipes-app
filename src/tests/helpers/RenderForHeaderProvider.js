import React from 'react';

import RenderWithRouterAndHistory from './RenderWithRouterAndHistory';

import AppProvider from '../../provider/AppProvider';

export default (component, route = '/') => RenderWithRouterAndHistory(
  <AppProvider>{component}</AppProvider>, route,
);
