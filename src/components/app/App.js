import {useState} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import decoration from '../../resources/img/vision.png';
import {CharsPage, ComicsPage} from "../../pages";


const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<CharsPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                    </Routes>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;