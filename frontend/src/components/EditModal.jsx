import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal,
    ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Radio, RadioGroup, Textarea, useDisclosure, } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import { BASE_URL } from "../App";

function EditModal({setUsers, user}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
	const{isLoading, setIsLoading} = (false);
	const [inputs, setInputs] = useState({
		name: user.name,
		time_due: user.time_due,
		description: user.description,
		importance: user.importance,
	});
	const toast = useToast();

	const handleEditUser = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/tasks/" + user.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u)));
			toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Task updated successfully.",
				duration: 2000,
				position: "top-center",
			});
			onClose();
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
				position: "top-center",
			});
		} finally {
			setIsLoading(false);
		}
	};

    return (
    <>
    <IconButton		
    onClick={onOpen}
    variant='ghost'
    colorScheme='blue'
    aria-label='See menu'
    size={"sm"}
    icon={<BiEditAlt size={20} />}
    />
    
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

		<form onSubmit={handleEditUser}>
		<ModalContent>
            <ModalHeader>My new Task 😊 </ModalHeader>
			<ModalCloseButton />
			<ModalBody pb={6}>
                <Flex alignItems={"center"} gap={4}>
                    <FormControl>
						<FormLabel>Name</FormLabel>
						<Input placeholder='Name of Task' 
						value={inputs.name}
						onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}/>
					</FormControl>

					<FormControl>
						<FormLabel>Time due</FormLabel>
						<Input placeholder='Time task is due' 
						value={inputs.time_due}
						onChange={(e) => setInputs((prev) => ({ ...prev, time_due: e.target.value }))}/>
					</FormControl>
				</Flex>

				<FormControl mt={4}>
					<FormLabel>Description</FormLabel>
					<Textarea
						resize={"none"}
						overflowY={"hidden"}
						placeholder="Write the description of task."
						value={inputs.description}
						onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))}
					/>
				</FormControl>

				<RadioGroup defaultValue='important' mt={4}>
                    <Flex gap={5}>
                        <Radio value='important'
						onChange={(e) => setInputs((prev) => ({ ...prev, importance: e.target.value }))}>Important</Radio>
                        <Radio value='not important'
						onChange={(e) => setInputs((prev) => ({ ...prev, importance: e.target.value }))}>Not important</Radio>
                    </Flex>
                </RadioGroup>
            </ModalBody>


			<ModalFooter>
				<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
				Update
 				</Button>
				<Button onClick={onClose}>Cancel</Button>
			</ModalFooter>
		</ModalContent>
		</form>

 	</Modal>
	</>
	);
}

export default EditModal;