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
                <Route path='/gallery' element={<Gallery/>}/>
                <Route path='/settings' element={<Settings/>} />
            </Routes>
        </MainLayout>
        </BrowserRouter>
    );
}

export default App;
