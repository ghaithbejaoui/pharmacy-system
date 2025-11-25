import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import AddMedicine from "./pages/AddMedicine";
import EditMedicine from "./pages/EditMedicine";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/add" element={<AddMedicine />} />
          <Route path="/edit/:id" element={<EditMedicine />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
