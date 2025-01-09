import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TouristAttraction from "./pages/TouristAttraction";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/tourist-attraction" element={<TouristAttraction />} />
      <Route path="/tourist-attraction/:id" element={<Detail />} />
    </Routes>
  );
};

export default App;
