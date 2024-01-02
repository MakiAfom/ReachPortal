import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MyToolbar = styled(Toolbar)(() => ({
  padding: "0.4rem 0",
})) as typeof Toolbar;

export const MyLogo = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "700",
  fontSize: "2.1rem",
  userSelect: "none",
  textDecoration: "none",
})) as typeof Typography;

export const MyAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(255,255,255,0.9)",
  zIndex: theme.zIndex.drawer + 1,
})) as typeof AppBar;
