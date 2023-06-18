
import { Routes, Route } from "react-router-dom";
import { ArchivePage, HomePage } from "./page";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/archive" element={<ArchivePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
