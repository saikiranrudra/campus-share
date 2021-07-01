import cookies from "next-cookies";
import jwt from "jsonwebtoken";
import axios from "axios";


/**
 * Check weather user is authenticated or not
 * 
 * IMP should be called inside the getServerSideProps 
 * 
 * @params ctx -- ctx is a parameter you will get in getServerSideProps
 * 
 * Steps:
 * 1. Check wheater user is authenticated or not
 * 2. Authenticated user gets Access to the page
 * 3. UnAuthenticated User is reverted back to /auth/sign page
 */

export const userAuthCheck = async (ctx) => {
  const token = cookies(ctx).authentication;
  if (token) {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const res = await axios.get(`${process.env.BASE_URL}/api/user`, {
        withCredentials: true,
        data: {
          email: tokenData.email,
        },
        headers: {
          cookie: ctx.req?.headers.cookie,
        },
      });

      return {
        props: {
          user: res.data.data,
        },
      };
    } catch (err) {
      //Not  authenticated
      ctx.res?.writeHead(302, {
        Location: `${process.env.BASE_URL}/auth/signin`,
      });
      ctx.res?.end();
    }
  } else {
    //Not authenticated
    ctx.res?.writeHead(302, {
      Location: `${process.env.BASE_URL}/auth/signin`,
    });
    ctx.res?.end();
  }

  return {
    props: {},
  };
}