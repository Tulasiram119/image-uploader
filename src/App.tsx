import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import { Layout } from "./components/Layout";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Header from "./components/Header";

import ImageViewer from "./components/ImageViewer";
import ImageGrid from "./components/ImageGrid";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/home"
        element={
          <>
            <Header />
            <Home />
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <>
            <Header />
            <ImageGrid />
          </>
        }
      />
      <Route path="/pic/:imageName" element={<ImageViewer />} />
    </Routes>
  );
}

export default App;
