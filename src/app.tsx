import * as React from 'react';
import * as ReactDOM from 'react-dom';

import "./index.css";

export function App() {
    return (
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
