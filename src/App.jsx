import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TouristAttraction from "./pages/TouristAttraction";
import Statistics from "./pages/Statistics";
import Goods from "./pages/Goods";
import Layout from "./components/Layout";
import TouristAttractionDetail from "./pages/TouristAttractionDetail";
import MyTravel from "./pages/MyTravel";
import MyPage from "./pages/MyPage";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tourist-attraction" element={<TouristAttraction />} />
          <Route
            path="/tourist-attraction/:id"
            element={<TouristAttractionDetail />}
          />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/goods" element={<Goods />} />
          <Route path="/mytravel" element={<MyTravel />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
