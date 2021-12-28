import { useState } from "react";
import {
  ListItemText,
  Avatar,
  ListItemAvatar,
  ListItem,
  Button,
  Collapse,
  List,
} from "@material-ui/core";
import campusShareAPI from "../../utils/Apis/campusShareAPI";

const btnColor = {
  true: "secondary",
  false: "primary",
};

const UserListItem = ({ user, getAllUsers }) => {
  const [open, setOpen] = useState(false);
  const [btnState, setBtnState] = useState({
    isLoading: false,
    txt: user.active ? "dectivate" : "activate",
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const changeUserState = () => {
    setBtnState({ txt: "loading...", isLoading: true });
    campusShareAPI
      .put("/api/user", { ...user, active: !user.active })
      .then((res) => {
        getAllUsers();
      })
      .catch(() => {
        setBtnState({
          txt: user.active ? "dectivate" : "activate",
          isLoading: false,
        });
      });
  };

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemAvatar>
          <Avatar>
            <img src={user.avatar} alt="avatar" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={user.fullName + `(${user.active ? "ACTIVATED" : "NOT ACTIVATED"})`} secondary={user.email} />
        <Button
          disabled={btnState.isLoading}
          color={btnColor[user.active]}
          onClick={changeUserState}
          variant="text"
        >
          {btnState.txt}
        </Button>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem>
          <ListItemText
            primary="adhaar Card"
            secondary={
              <a target="_blank" style={{ color: "#fff" }} href={user.adhaarId}>
                Show Adhaar Card
              </a>
            }
          />
          <ListItemText
            primary="College Id Card"
            secondary={
              <a
                target="_blank"
                style={{ color: "#fff" }}
                href={user.collegeId}
              >
                Show College Id Card
              </a>
            }
          />
          <ListItemText
            primary="Image Proof"
            secondary={
              <a
                target="_blank"
                style={{ color: "#fff" }}
                href={user.collegeId}
              >
                Show Image Proof
              </a>
            }
          />
        </ListItem>
      </Collapse>
    </List>
  );
};

export default UserListItem;
