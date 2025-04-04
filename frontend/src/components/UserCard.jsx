import {Avatar, Box, Card, CardHeader, Flex, Heading, Text, IconButton, CardBody } from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import EditModal from './EditModal';
import {BASE_URL} from '../App';

const UserCard = ({user}) => {
    const handleDeleteUser = async () => {
		try {
			const res = await fetch(BASE_URL + "/tasks/" + user.id, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
			toast({
				status: "success",
				title: "Success",
				description: "Task deleted successfully.",
				duration: 2000,
				position: "top-center",
			});
		} catch (error) {
			toast({
				title: "An error occurred",
				description: error.message,
				status: "error",
				duration: 4000,
				isClosable: true,
				position: "top-center",
			});
		}
	};

    return (
    <Card>
        <CardHeader>
            <Flex gap={4}>
                {/*Left*/}
                <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                <Avatar src='https://avatar.iran.liara.run/username?username={name}'/>
                <Box>
                    <Heading size='sm'>{user.name}</Heading>
                    <Text>{user.time_due}</Text>
                </Box>
                </Flex>

                {/*Right*/}
                <Flex>
                    {/*Edit Modal*/}
                    <EditModal 
                    user={user}
                    setUsers={setUsers}
                    />
                    
                    {/*Delete Icon and Modal*/}
                    <IconButton
						variant='ghost'
						colorScheme='red'
						size={"sm"}
						aria-label='See menu'
						icon={<BiTrash size={20} />}
						onClick={handleDeleteUser}
					/>
                </Flex>
            </Flex>
        </CardHeader>

        <CardBody>
            <Text>
                {user.description}
            </Text>
        </CardBody>

    </Card>
    );
};
export default UserCard;