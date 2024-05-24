import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Signup from "../Authentication/Signup";
import { useState } from "react";
import MyChats from "../MyChats";
import Chatbox from "..//Chatbox";
import { ChatState } from "../../Context/ChatProvider";
export default function CreateUser() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <>
      <Box bg="white" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Create</Tab>
            <Tab>Chat</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Signup />
            </TabPanel>
            <TabPanel>
              <Box
                d="flex"
                justifyContent="space-between"
                w="100%"
                h="91.5vh"
                p="10px"
              >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && (
                  <Chatbox
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                )}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
