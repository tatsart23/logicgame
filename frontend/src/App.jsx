import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Field from "./components/Field";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/noodle" element={<Field />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
