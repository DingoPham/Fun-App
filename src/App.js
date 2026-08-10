import './assets/css/App.css';
import './assets/css/Content.css';

import MainLayout from "./layouts/MainLayout";
import { HashRouter, Routes, Route } from "react-router-dom"

import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import Footer from "./layouts/Footer";
import Home from "./pages/neutral-group/Home";
import Gallery from "./pages/gallery-group/Gallery";
import Settings from "./pages/neutral-group/Settings";
import Illustration from "./pages/gallery-group/Illustration";
import Animation from "./pages/gallery-group/Animation";
import UserTable from "./components/users/UserTable";
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Login from "./pages/auth-group/Login";
import Register from "./pages/auth-group/Register";
import Profile from "./pages/neutral-group/Profile";
import ForgotPassword from "./pages/auth-group/ForgotPassword";
import ResetPassword from "./pages/auth-group/ResetPassword";

function App() {
    return (
        <HashRouter>
            <MainLayout
                header={<Header/>}
                sidebar={<Sidebar/>}
                footer={<Footer/>}
            >
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/gallery' element={<Gallery/>} />
                    <Route path='/gallery/illustration' element={<Illustration />} />
                    <Route path='/gallery/animation' element={<Animation />} />
                    <Route path='/settings' element={<Settings/>} />
                    <Route path='/settings/profile'  element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path='/settings/users' element={<UserTable />} />
                    <Route path="/users" element={<ProtectedRoute roles={["Admin"]}><UserTable /></ProtectedRoute>}/>
                    <Route path='/login' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path="/forgot-password" element={<ForgotPassword />}/>
                    <Route path="/reset-password" element={<ResetPassword />}
                    />
                </Routes>
            </MainLayout>
        </HashRouter>
    );
}

export default App;
