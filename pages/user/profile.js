import UserLayout from "../../src/components/layout/UserLayout";
import { userAuthCheck } from "./../../src/utils/userAuthCheck";

const Profile = (props) => {
  console.log(props)
  return (
    <UserLayout>
      <h1>hello world</h1>
    </UserLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  return await userAuthCheck(ctx);
};

export default Profile;
