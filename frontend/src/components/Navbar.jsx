import { Box, Button, Center, Container, Flex, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import {IoMoon} from 'react-icons/io5';
import {LuSun} from 'react-icons/lu';
import CreateUserModal from "./CreateUserModels";

const Navbar = () => {
    const {colorMode, toggleColorMode } = useColorMode()
    return <Container maxW={"900px"}>
        <Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200", "gray.700")}>

            <Flex h="16"
            alignItems={"center"}
            justifyContent={"space-between"}
            >

            {/* Left side */}
            <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            display={{base: "none", sm: "flex"}}>
            {/*sm means smaller screen*/}

            <img src="/writing.png" alt="writing image" width={50} height={50}></img>
            <Text fontSize={"50px"}>=</Text>
            <img src="/muscles.png" alt="muscles image" width={50} height={40}></img>
            <img src="/Awesome.png" alt="awesome image" width={45} height={45}></img>
            </Flex>

            {/* Right side */}
            <Flex gap={3} alignItems={Center}>
                <Text fontSize={"lg"} fontWeight={500} display={{base: "none", md: "block"}}>
                ✨ Tasks ✨
                </Text>
                {/*md means medium screen*/}

                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
                </Button>

                <CreateUserModal />
            </Flex>

            </Flex>
        </Box>
        Navbar</Container>
}
export default Navbar