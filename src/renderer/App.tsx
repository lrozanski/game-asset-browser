import {createRoot} from "react-dom/client";

import "./App.css";

export function App() {
    return (
        <div className="flex flex-col flex-grow flex-shrink-0 h-screen">
            <header className="header">Header</header>
            <section className="flex flex-row flex-grow mt-header mb-footer">
                <nav className="nav">
                    <Nav/>
                </nav>
                <section className="content">
                    Content
                </section>
            </section>
            <footer className="footer">Footer</footer>
        </div>
    );
}

export function Nav() {
    return (
        <ul className="appearance-none">
            <li>Assets</li>
            <li>Settings</li>
            <li>Help</li>
            <li onClick={window.electron.quit}>Exit</li>
        </ul>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<App/>);
