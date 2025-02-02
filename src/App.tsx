// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Main from "./components/Main.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Nav from "./components/Nav.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NoPage from "./components/NoPage.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { About } from "./components/About.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Footer } from "./components/Footer.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
