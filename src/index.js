import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import "./assets/styles.css";
import CoursePage from "./pages/CoursePage";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import { RtlProvider } from "./rtlProvider";
import "@fontsource/ruwudu";
import "@fontsource/almarai";
import theme from "./theme";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <RtlProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/course" element={<CoursePage />} />
            <Route path="/home/course/quiz" element={<QuizPage />} />
          </Routes>
        </BrowserRouter>
      </RtlProvider>
    </ChakraProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
