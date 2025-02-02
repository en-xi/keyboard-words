import { Outlet, Link } from "react-router-dom";
import { Footer } from "@/components/Footer.jsx";

const Nav = () => {
  return (
    <>
      <nav className="fixed w-full top-0 text-3xl bg-white">
        <span className="fixed bg-green-300 ">For English Beginners</span>
        <ul className="flex-center inline">
          <li className="link inline">
            <Link to="/">Home</Link>
          </li>
          <li className="link inline">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <div className="mt-10">
        <Outlet />
      </div>

      <Footer></Footer>
    </>
  );
};

export default Nav;
