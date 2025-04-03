import {Avatar, Box, Card, CardHeader, Flex, Heading, Text, IconButton } from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';

const UserCard = ({user}) => {
    return (
    <Card>
        <CardHeader>
            <Flex gap={"4"}>
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
                    <IconButton
						variant='ghost'
						colorScheme='red'
						size={"sm"}
						aria-label='See menu'
						icon={<BiTrash size={20} />}
						onClick={handleDeleteUser}
					/>

                    {/*Delete Modal*/}
                </Flex>
            </Flex>
        </CardHeader>

    </Card>
    );
};
export default UserCard;