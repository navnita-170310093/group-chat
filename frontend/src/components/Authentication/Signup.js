import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import Dashboard from "../Admin/Dashboard";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");

  const [check, setCheck] = useState("");

  const [userList, setUserList] = useState([]);

  const { user } = ChatState();

  //   const { data } = await axios.get(`/api/user/user-list`);
  const fetchData = useCallback(async () => {
    const result = await axios.get(`/api/user/user-list`);
    setUserList(result?.data);
  }, [check]);

  //  console.log(userList)

  useEffect(() => {
    fetchData();
    console.log(userList);
  }, [check, fetchData]);

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Role: user.isAdmin ? "admin" : "normal",
        },
      };
      const { data } = await axios.post(
        "/api/admin",
        {
          name,
          email,
          address: address ?? "",
          about: about ?? "",
          password,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // sessionStorage.setItem("userInfo", JSON.stringify(data));
      // history("/chats");
      setCheck(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <Box
        flexDir="row"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <VStack spacing="5px">
          <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Input
              placeholder="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          <FormControl id="about">
            <FormLabel>About</FormLabel>
            <Input
              placeholder="about"
              onChange={(e) => setAbout(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm password"
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
          >
            Create User
          </Button>
        </VStack>

        <Dashboard
          userList={userList}
          fetchData={fetchData}
          setUserList={setUserList}
        />
      </Box>
    </>
  );
};

export default Signup;
