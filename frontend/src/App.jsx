import logo from './logo.svg';
import './App.css';
import Menubar from './components/Menubar/Menubar';
import {Routes, Route, useLocation} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageCategory from "./pages/ManageCategory/ManageCategory";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ManageItems from "./pages/ManageItems/ManageItems";
import Explore from "./pages/Explore/Explore";
import Login from "./pages/Login/Login";
import { Toaster } from 'react-hot-toast';
import OrderHistory from "./pages/OrderHistory/OrderHistory";


function App() {
    const location = useLocation();
    return (
        <>
            {location.pathname !== "/login" && <Menubar />}
            <Toaster />
            <Routes>
                <Route path={"/dashboard"} element={<Dashboard/>}/>
                <Route path={"/category"} element={<ManageCategory/>}/>
                <Route path={"/users"} element={<ManageUsers/>}/>
                <Route path={"/items"} element={<ManageItems/>}/>
                <Route path={"/explore"} element={<Explore/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/orders"} element={<OrderHistory/>}/>
                <Route path={"/"} element={<Dashboard/>}/>

            </Routes>
        </>
    );
}

export default App;