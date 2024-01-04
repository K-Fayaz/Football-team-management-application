
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";

import Container from "./pages/container";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path="/" element={<Container/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
