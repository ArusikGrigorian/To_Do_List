import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


function SomeFunc() {
  return (
    <>

      <div className="container my-2">

        <App />
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<SomeFunc />, rootElement);