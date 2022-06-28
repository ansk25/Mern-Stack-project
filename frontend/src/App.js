import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyMemories from "./screens/MyMemories/MyMemories";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/login" element={<LoginScreen />} exact />
        <Route path="/profile" element={<ProfileScreen />} exact />
        <Route path="/register" element={<RegisterScreen />} exact />
        <Route path="/createentry" element={<CreateNote />} />
        <Route path="/mymemories" element={<MyMemories search={search} />} />
        <Route path="/note/:id" element={<SingleNote />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
