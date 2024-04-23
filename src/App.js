import { Route, Routes } from "react-router-dom";
import Topicinput from "./Topicinput";
import SubTopics from "./SubTopics";
import Learn from "./Learn";
import Test from "./Test";
import Login from "./Login";
import useToken from "./useToken";

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <>
    <Routes>
      {/* <Route path="/SubTopic" element={<SubTopics/>}></Route> */}
      {/* <Route path="/login" element={<Login/>}></Route> */}
      <Route path="/Learn" element={<Learn/>}></Route>
      <Route path="/Test" element={<Test/>}></Route>
      <Route path="*" element={<Topicinput/>}></Route>

    </Routes>
    </>
  );
}

export default App;
