import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          Logo
        </Link>
        <div className="nav-links-container">
          <Link to="shop">Shop</Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
