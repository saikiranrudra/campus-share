import { useCallback, useEffect, useState } from "react";
import Card from "../../src/components/utils/Card";
import Space from "../../src/components/utils/Space";
import campusShareAPI from "../../src/utils/Apis/campusShareAPI";
import { List } from "@material-ui/core";
import UserListItem from "../../src/components/user/UserListItem";
import CollegeListItem from "../../src/components/colleges/CollegeListItem";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [colleges, setColleges] = useState([]);

  const getAllUsers = useCallback(() => {
    campusShareAPI
      .get("/api/user")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [setUsers]);

  const getAllColleges = useCallback(() => {
    campusShareAPI.get("/api/college")
    .then(res => {
      setColleges(res.data.data);
      console.log(res.data.data);
    }).catch(err => console.log(err));
  }, [setColleges])

  useEffect(() => {
    getAllUsers();
    getAllColleges();
  }, []);

  return (
    <Space>
      <Card title="Admin Panel">
        <List>
          {users.map((user) => (
            <UserListItem
              user={user}
              key={`${user.email}-${user.active}`}
              getAllUsers={getAllUsers}
            />
          ))}
        </List>
      </Card>

      <br />

      <Card title="Colleges">
          <List>
            {colleges.map(college => <CollegeListItem key={college._id} college={college} />)}
          </List>
      </Card>
    </Space>
  );
};

export default Dashboard;
