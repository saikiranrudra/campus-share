import Logo from "./Logo";
import PropTypes from "prop-types";

/**
 *
 * A Horizontal Navigation Component <Nav />
 * @category Layout
 * @subCategory Desktop
 * @param {object} props
 * @param {boolean} props.logoWithName - whether you want app name with logo or not
 * @param {node} props.children - all the components thats going to be on left side of navigation
 *
 * @component
 * @example
 * <Nav logoWithName={true}>
 *  <Button variant="contained" color="primary">Sign In</Button>
 *  <Button variant="contained" color="primary">Sign Up</Button>
 * </Nav>
 *
 *
 */

const Nav = ({ logoWithName, children }) => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem 1.2rem" }}>
      <Logo withName={logoWithName} />
      <div>{children}</div>
    </nav>
  );
};

Nav.PropTypes = {
  /**
   * Weather you want name with logo or not
   */
  logoWithName: PropTypes.bool,
  /**
   * all the components thats going to be on left side of navigation
   */
  children: PropTypes.node,
};

Nav.defaultProps = {
  logoWithName: true,
};

export default Nav;