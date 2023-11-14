import './App.css'
import Home from './pages/Home'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Custom from "./pages/Custom/Index.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/*" element={<Custom />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
