import "./App.css";
import Registrazione from "./components/registrazione";
import Login from "./components/login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Benvenuto nella hompage</h1>}></Route>
            <Route
              path="/registrazione"
              element={<Registrazione></Registrazione>}
            ></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
