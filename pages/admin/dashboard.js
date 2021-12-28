import { useCallback, useEffect, useState } from "react";
import Card from "../../src/components/utils/Card";
import Space from "../../src/components/utils/Space";
import campusShareAPI from "../../src/utils/Apis/campusShareAPI";
import { List } from "@material-ui/core";
import UserListItem from "../../src/components/user/UserListItem";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const getAllUsers = useCallback(() => {
    campusShareAPI
      .get("/api/user")
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [setUsers]);

  useEffect(() => {
    getAllUsers();
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
    </Space>
  );
};

export default Dashboard;
