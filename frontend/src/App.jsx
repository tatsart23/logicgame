import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Field from "./components/Field";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4">
        <Routes>
          {/* Lisää reitit tähän */}
          <Route path="/" element={<Home />} />
          <Route path="/noodle" element={<Field />} />
          {/* Lisää muita reittejä tarpeen mukaan */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
