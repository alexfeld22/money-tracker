import { AppBar, Toolbar, Avatar } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ flexDirection: "row-reverse"}}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Toolbar>
    </AppBar>
  );
}