import {Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import {BiAddToQueue} from 'react-icons/bi';
import { useState } from 'react';
import {BASE_URL} from '..//App';

const CreateUserModal = () => {
    const{isOpen, onOpen, OnClose} = useDisclosure();
    const{isLoading, setIsLoading} = useState(false); 
    const{inputs, setInputs} = useState({
        name: "",
        time_due: "",
        description: "",
        importance: "",
    });

    const toast = useToast()

    const handleCreateUser = async (e) => {
		e.preventDefault(); // prevent page refresh
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}

			toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Task created successfully.",
				duration: 2000,
				position: "top-center",
			});
            onClose();
			setUsers((prevUsers) => [...prevUsers, data]);

			setInputs({
				name: "",
				time_due: "",
				description: "",
				importance: "",
			}); // clear inputs
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
			});
		} finally {
			setIsLoading(false);
		}
	};

    return ( <>
    <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
    </Button>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={() => alert("Task created")}>
        <ModalContent>
            <ModalHeader> My new Task 😊 </ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
                <Flex alignItems={"center"} gap={4}>
                {/*Left*/}
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Name of Task"
                    value={inputs.name}
                    onChange={(e) => setInputs({...inputs, name: e.target.value})}
                    />
                </FormControl>

                {/*Right*/}
                <FormControl>
                    <FormLabel>Time due</FormLabel>
                    <Input placeholder="Time task is due"
                    value={inputs.time_due}
                    onChange={(e) => setInputs({...inputs, time_due: e.target.value})}
                    />
                </FormControl>
                </Flex>

                <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea 
                    resize={"none"} 
                    overflow={"hidden"}
                    placeholder="Write the description of task" 
                    value={inputs.description}
                    onChange={(e) => setInputs({...inputs, description: e.target.value})}
                    />
                </FormControl>

                <RadioGroup mt={4}>
                    <Flex gap={5}>
                        <Radio value='important'
                        onChange={(e) => setInputs({...inputs, importance: e.target.value})}>Important</Radio>
                        <Radio value='not important'
                        onChange={(e) => setInputs({...inputs, importance: e.target.value})}>Not important</Radio>
                    </Flex>
                </RadioGroup>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme={'blue'} mr={3} type='submit'
                isLoading={isLoading}>
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>

        </ModalContent>
        </form>
    </Modal>
    </> 
    );
};
export default CreateUserModal;