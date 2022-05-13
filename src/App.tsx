import {createRoot} from "react-dom/client";

import "./App.css";

export function App() {
    return (
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<App/>);
