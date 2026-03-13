import './assets/css/App.css';
import './assets/css/Content.css';

import MainLayout from "./layouts/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Settings from "./pages/Settings";
import Illustration from "./pages/gallery-group/Illustration";
import Animation from "./pages/gallery-group/Animation";
import UserProfile from "./components/users/UserProfile";
import UserTable from "./components/users/UserTable";

function App() {
    return (
        <BrowserRouter>
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
                    <Route path='/settings/profile' element={<UserProfile />} />
                    <Route path='/settings/users' element={<UserTable />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
