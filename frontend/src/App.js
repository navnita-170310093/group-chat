import "./App.css";
import Homepage from "./Pages/Homepage";
import { Routes, Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import Adminpage from "./Pages/Adminpage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/chats" element={<Chatpage />} />
        <Route path="/admin" element={<Adminpage />} />
      </Routes>
    </div>
  );
}

export default App;
