import SideNav from "./SideNav";

/**
 * Every User Page should be wrapped inside UserLayout
 * @param { children } props 
 */

const UserLayout = ({ children }) => {
  return (
    <>
      <SideNav />
      {children}
    </>
  );
}

export default UserLayout;