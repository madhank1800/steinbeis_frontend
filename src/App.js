
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './SIGNINPAGE/Signinpage';
import Login from './LoginPage/LoginPage';
import Home from "./HOME/homePage";
import Protected from "./Protected/Protected";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signinPage" element={<Signin />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
