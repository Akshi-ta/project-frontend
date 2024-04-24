import { Route, Routes } from "react-router-dom";
import Topicinput from "./Topicinput";
import SubTopics from "./SubTopics";
import Learn from "./Learn";
import Test from "./Test";
import Login from "./Login";
import Signup from "./Signup";

function App() {

  return (
    <>
    <Routes>
      {/* <Route path="/SubTopic" element={<SubTopics/>}></Route> */}
      {/* <Route path="/login" element={<Login/>}></Route> */}
      <Route path="/Learn" element={<Learn/>}></Route>
      <Route path="/Test" element={<Test/>}></Route>
      <Route path="/TopicInput" element={<Topicinput/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="*" element={<Signup/>}></Route>

    </Routes>
    </>
  );
}

export default App;
