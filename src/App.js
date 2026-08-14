import React from "react";
import "./App.css";
import "h8k-components";
import Main from "./components/Main";

const title = "Cryptocurrency Exchange";

const App = () => {
  return (
    <div>
      <h8k-navbar header={title}></h8k-navbar>
      <Main />
    </div>
  );
};

export default App;