import React, { Suspense, useLayoutEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Footer from './containers/Footer';
import Header from './containers/Header';
import MainPage from './pages/MainPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoutes from './utils/privateRoutes';

const queryClient = new QueryClient();

function App() {
  // 페이지 코드 스플리팅
  // 테스트 페이지는 애초에 접근할 이유가 없으니 스플리팅
  const TestPage = React.lazy(() => import('@pages/TestPage'));
  // 주로 View 사용이 크며 등록은 선택이니 스플리팅
  const RecipeRegisterPage = React.lazy(() => import('@pages/RecipeRegisterPage'));
  // 마이페이지 접속을 안할 가능성이 크니 스플리팅
  const MyPage = React.lazy(() => import('@pages/mypage/MyPage'));
  // 냉장고 기능을 이용 안할 수 있으니 스플리팅
  const MyRefrigeratorPage = React.lazy(() => import('@pages/mypage/MyRefrigeratorPage'));
  // 자기 정보를 수정 안하는 경우도 많으니 스플리팅
  const UserEditProfile = React.lazy(() => import('@pages/mypage/UserEditProfile'));

  useLayoutEffect(() => {
    const userInfoArr = window.location.href.split('&');

    // console.log(access_token)
    if (userInfoArr.length > 2) {
      const accessToken = userInfoArr[0].split('?')[1].replace('Access-Token=', '');
      const expireDate = userInfoArr[1].replace('expireDate=', '');
      const isNew = userInfoArr[2].replace('isNew=', '');

      localStorage.clear();
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('expireDate', expireDate);

      // axiosInstance.defaults.headers.common["accessToken"] = accessToken;
      if (isNew === 'true') {
        window.location.replace('/myPage/userEditPage');
      }
      window.location.replace('/');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/test"
              element={
                <Suspense>
                  <TestPage />
                </Suspense>
              }
            />
            <Route path="/signInPage" element={<SignInPage />} />
            <Route path="/signUpPage" element={<SignUpPage />} />
            <Route path="/recipeDetailPage" element={<RecipeDetailPage />} />
            {/* 로그인이 필요한 페이지는 코드 스플리팅을 진행 */}
            <Route element={<PrivateRoutes authentication />}>
              <Route
                path="/recipeRegisterPage"
                element={
                  <Suspense>
                    <RecipeRegisterPage />
                  </Suspense>
                }
              />
              <Route
                path="/myPage"
                element={
                  <Suspense>
                    <MyPage />
                  </Suspense>
                }
              />
              <Route
                path="/myPage/myRefrigeratorPage"
                element={
                  <Suspense>
                    <MyRefrigeratorPage />
                  </Suspense>
                }
              />
              <Route
                path="/myPage/userEditPage"
                element={
                  <Suspense>
                    <UserEditProfile />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
          {/* </div>
            </div>
          </div> */}
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
