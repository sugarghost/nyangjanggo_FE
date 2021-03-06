import axios from 'axios';
import React, { Suspense, useEffect, useLayoutEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { refreshToken } from './apis/AuthApi';
import { axiosInstance } from './apis/axiosInstance';
import Footer from './containers/Footer';
import Header from './containers/Header';
import MainPage from './pages/MainPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeRegisterPage from './pages/RecipeRegisterPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import TestPage from './pages/TestPage';
import MyPage from './pages/mypage/MyPage';
import MyRefrigeratorPage from './pages/mypage/MyRefrigeratorPage';
import UserEditProfile from './pages/mypage/UserEditProfile';
import { isExp } from './utils/jwt';
import PrivateRoutes from './utils/privateRoutes';

const queryClient = new QueryClient();

function App() {
  useLayoutEffect(() => {
    /*
    localStorage.setItem(
      'accessToken',
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHNsdHM5NUBnbWFpbC5jb20iLCJyb2xlcyI6IlVTRVIiLCJpYXQiOjE2NTczMzI5NjUsImV4cCI6MTY1ODU0MjU2NX0.eZl4GB5_swQw7nGQV4YhBdq3Uswc7Vtixb5FdBObgls',
    );
    */
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

    // if (localStorage.getItem('token')) {
    //   const token = localStorage.getItem('token') as string;
    //   axios.defaults.headers.common.accessToken = token;

    //   console.log(isExp(token));
    //   if (isExp(token)) {
    //     refreshToken();
    //   }
    // }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Header />
          {/* <div className="bg-secondary-1 flex items-center min-h-screen bg-white dark:bg-gray-900">
              <div className="container max-w-screen-lg xl:max-w-screen-xl mx-auto">
              <div className="max-w-md mx-auto my-10 w-full"> */}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/signInPage" element={<SignInPage />} />
            <Route path="/signUpPage" element={<SignUpPage />} />
            <Route path="/recipeDetailPage" element={<RecipeDetailPage />} />
            {/* ???????????? ????????? ????????? */}
            <Route element={<PrivateRoutes authentication />}>
              <Route path="/recipeRegisterPage" element={<RecipeRegisterPage />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/myPage/myRefrigeratorPage" element={<MyRefrigeratorPage />} />
              <Route path="/myPage/userEditPage" element={<UserEditProfile />} />
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
