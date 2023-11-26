// import "./App.css";
// import HomePage from "./pages/HomePage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import CreateAccountPage from "./pages/CreateAccountPage.jsx";
// import DashboardPage from "./pages/DashboardPage.jsx";
// import TruckPage from "./pages/TruckPage.jsx";

// function App() {
//   return (
//     <>
//       <DashboardPage name="Josie" />
//     </>
//   );
// }
// export default App;

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreateAccountPage from "./pages/CreateAccountPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import TruckPage from "./pages/TruckPage.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createaccount" element={<CreateAccountPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/truckpage" element={<TruckPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
