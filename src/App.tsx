import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TestPage,{BoardPost} from "./pages/TestPage";

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
            <Route path="/myPage" element={<MainPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/testBoradPost" element={<BoardPost />} />
            <Route path="/signInPage" element={<SignInPage />} />
            <Route path="/signUpPage" element={<SignUpPage />} />
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
