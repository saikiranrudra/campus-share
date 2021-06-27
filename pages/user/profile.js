import cookies from "next-cookies";
import jwt from "jsonwebtoken";
import axios from "axios";

const Profile = (props) => {
  console.log(props.user);
  return <h1>hello world</h1>;
};

export async function getServerSideProps(ctx) {
  const token = cookies(ctx).authentication;
  if(token){
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
        Location: `${process.env.BASE_URL}/auth/signin`
      })
      ctx.res?.end();
    }
  } else {
    //Not authenticated
    ctx.res?.writeHead(302, {
      Location: `${process.env.BASE_URL}/auth/signin`
    })
    ctx.res?.end();
  }

  return {
    props: {}
  };
}

export default Profile;
