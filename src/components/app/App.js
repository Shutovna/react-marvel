import {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import decoration from '../../resources/img/vision.png';
import {CharsPage, ComicsPage, Page404, SingleComicPage} from "../../pages";


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<CharsPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                        <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        </Router>

    )
}

export default App;