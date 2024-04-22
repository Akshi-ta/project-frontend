import { Route, Routes } from "react-router-dom";
import Topicinput from "./Topicinput";
import SubTopics from "./SubTopics";
import Learn from "./Learn";
import Test from "./Test";
function App() {
  return (
    <>
    <Routes>
      {/* <Route path="/SubTopic" element={<SubTopics/>}></Route> */}
      <Route path="/Learn" element={<Learn/>}></Route>
      <Route path="/Test" element={<Test/>}></Route>
      <Route path="*" element={<Topicinput/>}></Route>

    </Routes>
    </>
  );
}

export default App;
