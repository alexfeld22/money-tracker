import { AppBar, Toolbar, Avatar } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ flexDirection: "row-reverse" , ml: "20px"}}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Toolbar>
    </AppBar>
  );
}