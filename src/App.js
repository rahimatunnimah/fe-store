import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayNavbar from "./components/Outlet/DisplayNavbar";
import WithoutNavbar from "./components/Outlet/WithoutNavbar";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { ProfileContext } from "./context";

function App() {
  return (
    <>
      <ProfileContext.Provider
        value={
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : {}
        }
      >
        <BrowserRouter>
          <Routes>
            <Route element={<WithoutNavbar />}>
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
            </Route>
            <Route element={<DisplayNavbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:id" element={<DetailProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProfileContext.Provider>
    </>
  );
}

export default App;
