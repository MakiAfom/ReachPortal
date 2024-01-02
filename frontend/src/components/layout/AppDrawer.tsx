import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { MyToolbar } from "../../utils/StyledComps";

const MyListItemButton = styled((props) => (
  <ListItemButton {...props} disableGutters />
))(({ theme }) => ({
  color: theme.palette.text.secondary,
})) as typeof ListItemButton;

const MyListItemText = styled((props) => (
  <ListItemText {...props} disableTypography />
))(() => ({
  fontFamily: "Inter, sans-serif",
  fontSize: "1.05rem",
})) as typeof ListItemText;

function AppDrawer(): JSX.Element {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((open) => !open);
  const close = () => setOpen(false);

  return (
    <>
      <Drawer open={open} anchor="top">
        <MyToolbar />
        <List sx={{ mx: 3 }} disablePadding>
          <MyListItemButton onClick={close} component={Link} to="/">
            <MyListItemText primary="Home" />
          </MyListItemButton>
          <MyListItemButton onClick={close} component={Link} to="/resources">
            <MyListItemText primary="Resources" />
          </MyListItemButton>
          <MyListItemButton onClick={close} component={Link} to="/about">
            <MyListItemText primary="About us" />
          </MyListItemButton>
          <MyListItemButton onClick={close} component={Link} to="/login">
            <MyListItemText primary="Login" />
          </MyListItemButton>
          <MyListItemButton onClick={close} component={Link} to="/register">
            <MyListItemText primary="Register" />
          </MyListItemButton>
        </List>
      </Drawer>
      <IconButton onClick={toggle}>
        {open && <CloseIcon color="secondary" fontSize="large" />}
        {!open && <MenuIcon color="secondary" fontSize="large" />}
      </IconButton>
    </>
  );
}

export default AppDrawer;
