import React from "react";
import CreateUser from "../components/Admin/CreateUser";
import Dashboard from "../components/Admin/Dashboard";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";

export default function Adminpage() {
  const { user } = ChatState();

  const history = useNavigate();
  if (!user?.isAdmin) {
    history("/");
  }
  return (
    <>
      <div style={{ width: "100%" }}>
        Adminpage
        <SideDrawer />
        {/* <Box  flexDir="row"  style={{display: 'flex', width: '100%', justifyContent:'space-evenly'}}> */}
        <CreateUser />
        {/* </Box> */}
      </div>
    </>
  );
}
