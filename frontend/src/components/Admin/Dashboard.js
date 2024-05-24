import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useState, useEffect, useCallback } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";

import { useToast } from "@chakra-ui/toast";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function Dashboard({ userList, setUserList, fetchData }) {
  const { user } = ChatState();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState();
  const [about, setAbout] = useState();

  const submitHandler = async (normalUser) => {
    console.log(normalUser, address, about);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Role: user.isAdmin ? "admin" : "normal",
        },
      };
      const { data } = await axios.post(
        "/api/admin/edit",
        {
          email: normalUser.email,
          address,
          about,
        },
        config
      );
      toast({
        title: "Edit Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
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

    fetchData();
  };

  return (
    <>
      <div>
        {" "}
        User List
        {userList.map((user) => (
          <Box
            onClick={() => {}}
            cursor="pointer"
            bg={"#38B2AC"}
            color={"white"}
            px={3}
            py={2}
            mb={3}
            borderRadius="lg"
            key={user._id}
          >
            <Text>
              Name:
              {user.name}
            </Text>

            <Text>
              Email:
              {user.email}
            </Text>

            <Button onClick={onOpen}>Edit User Details</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <h1>{user.name}</h1>
                  <VStack spacing="5px">
                    <FormControl id="address">
                      <FormLabel>Address</FormLabel>
                      <Input
                        placeholder="address"
                        defaultValue={user.address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="about">
                      <FormLabel>About</FormLabel>
                      <Input
                        defaultValue={user.about}
                        placeholder="about"
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </FormControl>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    colorScheme="blue"
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={() => submitHandler(user)}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        ))}
      </div>
    </>
  );
}
