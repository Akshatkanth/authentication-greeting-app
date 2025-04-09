import { Box, Button, AppBar, Toolbar } from "@mui/material";
import { Outlet, Link } from "react-router-dom";

const nav = [
  { name: "Home", link: "/home" },
  { name: "Login", link: "/login" },
  { name: "SignUp", link: "/signup" },
  { name: "LogOut", link: "/logout" },
];

function Navbar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" variant="outlined" color="inherit">
          <Toolbar sx={{ justifyContent: "center" }}>
            {nav.map((item) => (
              <Button
                key={item.name}
                variant="contained"
                sx={{ mx: 2, boxShadow: "1", textTransform: "none" }}
              >
                <Link
                  to={item.link}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {item.name}
                </Link>
              </Button>
            ))}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flex: 1,justifyItems:'center',m:4 }}>
        {/* <Outlet /> */}
      </Box>
    </>
  );
}

export default Navbar;
