import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {CgMenuGridR} from "react-icons/cg";

import "./App.css";

export function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col flex-grow flex-shrink-0 h-screen">
                <header className="header">Header</header>
                <section className="flex flex-row flex-grow mt-header mb-footer">
                    <nav className="nav">
                        <Nav/>
                    </nav>
                    <section className="content">
                        <Routes>
                            <Route path="/main_window" element={<span>Home</span>}/>
                            <Route path="/assets" element={<AssetList/>}/>
                        </Routes>
                    </section>
                </section>
                <footer className="footer">Footer</footer>
            </div>
        </BrowserRouter>
    );
}

export function Nav() {
    return (
        <div className="flex flex-col">
            <NavLink to="/assets" className="nav-button"><CgMenuGridR className="w-6 h-6 mr-2"/>Assets</NavLink>
            <button className="nav-button">Settings</button>
            <button className="nav-button">Help</button>
            <button className="nav-button" onClick={window.electron.quit}>Exit</button>
        </div>
    );
}

export function AssetList() {
    return (
        <div className="flex flex-row align-middle justify-center border-2 border-gray-700 rounded-lg overflow-hidden">
            <img alt="Banana_01_b.png" src="media://C:/Users/lroza/Pictures/Screenshots/Screenshot.png"/>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<App/>);
