import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import MainPage from "./pages/MainPage";
import RecipeRegisterPage from "./pages/RecipeRegisterPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
<<<<<<< HEAD
import TestPage from "./pages/TestPage";
=======
import MyPage from "./pages/mypage/MyPage";
import MyRefrigeratorPage from "./pages/mypage/MyRefrigeratorPage";
>>>>>>> dev

const queryClient = new QueryClient();
function App() {
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
<<<<<<< HEAD
            <Route path="/myPage" element={<MainPage />} />
            <Route path="/test" element={<TestPage />} />
=======
            <Route path="/myPage" element={<MyPage />} />
            <Route
              path="/myRefrigeratorPage"
              element={<MyRefrigeratorPage />}
            />
>>>>>>> dev
            <Route path="/signInPage" element={<SignInPage />} />
            <Route path="/signUpPage" element={<SignUpPage />} />
            <Route
              path="/recipeRegisterPage"
              element={<RecipeRegisterPage />}
            />
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
