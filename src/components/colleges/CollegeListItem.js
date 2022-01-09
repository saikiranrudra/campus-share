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

const CollegeListItem = ({ college }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
      <List>
        <ListItem button onClick={handleClick}>
            <ListItemText 
                primary={college.name}
                secondary={college.university}
            />

            <Button
                color="primary"
                variant="outlined"
            >
                {college.instituteType}
            </Button>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <ListItem>
                <ListItemText 
                    primary="District" 
                    secondary={college.district}
                />
                <ListItemText 
                    primary="Institute Type" 
                    secondary={college.instituteType}
                />
                <ListItemText 
                    primary="State" 
                    secondary={college.state}
                />
                <ListItemText 
                    primary="University" 
                    secondary={college.university}
                />
            </ListItem>

        </Collapse>
      </List>
  );
};

export default CollegeListItem;
