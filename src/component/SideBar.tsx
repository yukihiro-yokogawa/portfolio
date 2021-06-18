import React from "react";
import { SideBarStates } from "~/Type/SideBar";
import { List, ListItem, ListItemText } from "@material-ui/core";

const sideBar = (props: SideBarStates): JSX.Element => {
  const { selectedIndex, handleClick } = props;

  return (
    <>
      <List id="sidebar" component="nav">
        {props.sideBar.map((value, index) => {
          return (
            <ListItem
              key={value.id}
              button
              selected={
                selectedIndex == 0 ? index == 0 : selectedIndex === value.id
              }
              onClick={() => handleClick(value.id)}
            >
              <ListItemText primary={value.name} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default sideBar;
