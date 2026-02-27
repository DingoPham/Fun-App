import '../src/assets/App.css';
import MainLayout from "./layouts/MainLayout";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";
import Footer from "./layouts/Footer";

function App() {
    return (
        <MainLayout>
            {<Header/>}
            {<Sidebar/>}
            {<Footer/>}
        </MainLayout>
    );
}

export default App;
