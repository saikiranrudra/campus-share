import { Typography } from "@material-ui/core";
import Image from "next/image";
import PropTypes from "prop-types";

/**
 *
 * A Logo Component with and without text
 * @category Core
 * @subCategory Desktop/Mobile
 * @param {object} props
 * @param {boolean} props.withName - whether you want app name with logo or not
 *
 * @component
 * @example
 * <Logo withName=true />
 *
 *
 **/

const Logo = ({ withName }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src="/logo.svg" alt="product logo" width="43rem" height="43rem" />
      {withName && (
        <Typography
          variant="body2"
          component="h1"
          style={{ textTransform: "uppercase", marginLeft: ".8rem" }}
        >
          {process.env.appName}
        </Typography>
      )}
    </div>
  );
};

export default Logo;

Logo.propTypes = {
  withName: PropTypes.bool,
};

Logo.defaultProps = {
  withName: false
}