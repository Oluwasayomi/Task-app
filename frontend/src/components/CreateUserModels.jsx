import {Button, Flex, FormControl, FormLabel, Input, Modal,
    ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea,
	useDisclosure, useToast,} from '@chakra-ui/react';
import {BiAddToQueue} from 'react-icons/bi';

const CreateUserModal = () => {
    const{isOpen, onOpen, OnClose} = useDisclosure()
    return <>
    <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
    </Button>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader> My new Task 😊 </ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
                <Flex alignItems={"center"} gap={4}>
                {/*Left*/}
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Name of Task"/>
                </FormControl>

                {/*Right*/}
                <FormControl>
                    <FormLabel>Time due</FormLabel>
                    <Input placeholder="Time task is due"/>
                </FormControl>
                </Flex>

                <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea 
                    resize={"none"} 
                    overflow={"hidden"}
                    placeholder="Write the description of task" />
                </FormControl>

                <RadioGroup mt={4}>
                    <Flex gap={5}>
                        <Radio value='important'>Important</Radio>
                        <Radio value='not important'>Not importangt</Radio>
                    </Flex>
                </RadioGroup>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme={'blue'} mr={3}>
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>

        </ModalContent>
    </Modal>
    </>
};
export default CreateUserModal;