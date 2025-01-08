import { BrowserRouter, Route, Routes } from "react-router-dom";
import BackendLayout from "./components/BackendLayout";
import Index from "./pages/Index";
import AddInfoForm from "./pages/AddInfoForm";
import EditInfoForm from "./pages/EditInfoForm";
import Detail from "./pages/Detail";
import AddCMLForm from "./pages/AddCMLForm";
import EditCMLForm from "./pages/EditCMLForm";
import TPTable from "./pages/TPTable";
import AddTPForm from "./pages/AddTPForm";
import EditTPForm from "./pages/EditTPForm";
import ThicknessTable from "./pages/ThicknessTable";
import AddThicknessForm from "./pages/AddThicknessForm";
import EditThicknessForm from "./pages/EditThicknessForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BackendLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/add-info" element={<AddInfoForm />} />
          <Route path="/edit/:lineNumber" element={<EditInfoForm />} />
          <Route path="/detail/:lineNumber" element={<Detail />} />
          <Route path="/add-cml/:lineNumber" element={<AddCMLForm />} />
          <Route
            path="/edit-cml/:lineNumber/:cmlNumber"
            element={<EditCMLForm />}
          />
          <Route
            path="/add-tp/:lineNumber/:cmlNumber"
            element={<AddTPForm />}
          />
          <Route path="/view-tp/:lineNumber/:cmlNumber" element={<TPTable />} />
          <Route
            path="/edit-tp/:lineNumber/:cmlNumber/:tpNumber"
            element={<EditTPForm />}
          />
          <Route
            path="/view-thickness/:lineNumber/:cmlNumber/:tpNumber"
            element={<ThicknessTable />}
          />
          <Route
            path="/add-thickness/:lineNumber/:cmlNumber/:tpNumber"
            element={<AddThicknessForm />}
          />
          <Route path="/edit-thickness/:id" element={<EditThicknessForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
