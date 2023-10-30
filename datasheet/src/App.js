import React from "react";
import { render } from "react-dom";
import Line from "./Components/Line/Line";
import Torque from "./Components/torque";
import Temperture from "./Components/temperture";
// 首先我们需要导入一些组件...
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";

// 然后我们从应用中删除一堆代码和
// 增加一些 <Link> 元素...
export default function App() {
  return (
    <BrowserRouter>
      <Link to="line">line</Link>;
      <Link to="torque">torque</Link>;
      <Link to="temperture">temperture</Link>;
      <Routes>
        <Route path="/line" element={<Line />} />
        <Route path="/torque" element={<Torque />} />
        <Route path="/temperture" element={<Temperture />} />
      </Routes>
    </BrowserRouter>
  );
}

// 最后，我们用一些 <Route> 来渲染 <Router>。
// 这些就是路由提供的我们想要的东西。
// React.render(
//   <Router>
//     <Route path="/" component={App}>
//       <Route path="line" component={Line} />
//       {/* <Route path="inbox" component={Inbox} /> */}
//     </Route>
//   </Router>,
//   document.body
// );
