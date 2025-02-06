import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Field from "./components/noodle/Field";
import Home from "./components/Home";
import Board from "./components/tileswapper/Board";
import Golf from "./components/minigolf/Golf";
import Flappy from "./components/flappyclone/Flappy";



function App() {
  return (
    <Router>
      <div className="bg-wrapper">
        <div className="bg-box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="container mx-auto px-4 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/noodle" element={<Field />} /> 
            <Route path="/tileswap" element={<Board />} />
            <Route path="/minigolf" element={<Golf />} />
            <Route path="/flappy" element={<Flappy />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
