import { Typography } from "@material-ui/core";
import Image from "next/image";

const Logo = ({ appName }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image src="/logo.svg" alt="product logo" width="43rem" height="43rem" />
      <Typography variant="body2" component="h1" style={{ textTransform: "uppercase", marginLeft: ".8rem" }}>
        {appName}
      </Typography>
    </div>
  );
};

export default Logo;
