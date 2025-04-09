import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import Forms from "../Forms/forms";

function Home() {
  const [loginType, setLoginType] = useState(null);

  const handleLoginType = (name:any) => {
    setLoginType(name);
  };

  return (
    <>
      <Box sx={{ flex: 1, border: "2px solid beige", padding: 4, textAlign: "center" }}>
        <Typography variant="h4">Welcome</Typography>
        <Typography variant="h4">To</Typography>
        <Typography variant="h4">Our</Typography>
        <Typography variant="h4">RAuth App</Typography>

        <Typography variant="h5" mt={4} textAlign={"center"} color="#2596be">
          Who You Are?
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={() => handleLoginType("Admin")}
          >
            Admin
          </Button>
          <Button
            onClick={() => handleLoginType("User")}
            variant="contained"
            color="secondary"
            sx={{ textTransform: "none" }}
          >
            User
          </Button>
        </Box>
        {loginType && <Forms loginType={loginType} />}
      </Box>
    </>
  );
}

export default Home;

