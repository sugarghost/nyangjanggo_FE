import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import 'virtual:windi-devtools';
import 'virtual:windi.css';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // 2번 렌더링하는거 방지
  // <React.StrictMode>
  <RecoilRoot>
    <React.Suspense fallback={<div>Loading... </div>}>
      <App />
    </React.Suspense>
  </RecoilRoot>,
  // </React.StrictMode>
);
