import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal,
    ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Radio, RadioGroup, Textarea, useDisclosure, } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

function EditModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
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
		<ModalContent>
            <ModalHeader>My new Task 😊 </ModalHeader>
			<ModalCloseButton />
			<ModalBody pb={6}>
                <Flex alignItems={"center"} gap={4}>
                    <FormControl>
						<FormLabel>Name</FormLabel>
						<Input placeholder='Name of Task' />
					</FormControl>

					<FormControl>
						<FormLabel>Time due</FormLabel>
						<Input placeholder='Time task is due' />
					</FormControl>
				</Flex>

				<FormControl mt={4}>
					<FormLabel>Description</FormLabel>
					<Textarea
						resize={"none"}
						overflowY={"hidden"}
						placeholder="Write the description of task."
					/>
				</FormControl>

				<RadioGroup defaultValue='important' mt={4}>
                    <Flex gap={5}>
                        <Radio value='important'>Important</Radio>
                        <Radio value='not important'>Not importangt</Radio>
                    </Flex>
                </RadioGroup>
            </ModalBody>


			<ModalFooter>
				<Button colorScheme='blue' mr={3}>
				Add
 				</Button>
				<Button onClick={onClose}>Cancel</Button>
			</ModalFooter>
		</ModalContent>
 	</Modal>
	</>
	);
}

export default EditModal;