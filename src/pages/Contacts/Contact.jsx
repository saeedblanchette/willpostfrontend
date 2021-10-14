import {
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Switch,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
  Tooltip,
  Tr,
  Td,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContactService } from '../../services';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
const Contact = React.forwardRef(({
  index,
  email,
  first_name,
  last_name,
  phone,
  id,
  is_safe_guard,
  onUpdate,
  onDelete,
  ...rest
},ref) => {
  const [nonFieldErrors, setNonFieldErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const service = ContactService();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState,
    formState: { errors },
  } = useForm();
  const watchFistName = watch('first_name', first_name);
  const watchLastName = watch('last_name', last_name);
  const watchEmail = watch('email', email);
  // const watchPhone = watch('phone', phone);
  const watchIsSafeguard = watch('is_safe_guard', is_safe_guard);
  const onCancel = () => {
    reset({});
    onClose();
  };
  const onOpenPopover = () => setIsOpenPopover(!isOpenPopover);
  const closePopover = () => setIsOpenPopover(false);
  const handelOnClose = () => {
    if (formState.isValid) {
      onClose();
    }
    reset({});
  };
  const deleteContact = () => {
    setIsDeleteLoading(true);
    service
      .deleteContact(id)
      .then(res => {
        setIsDeleteLoading(false);
        closePopover();
        onDelete(index);
        toast({
          title: 'Deletion',
          description: 'The contact have been deleted successfully ',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(error => {
        try {
          closePopover();
          setIsDeleteLoading(false);

        } catch (error) {
          toast({
            title: 'Delete ',
            description:
              "we can't delete the contact right now. please try later",
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      });
  };
  const handelUpdate = data => {
    setIsLoading(true);
    service
      .update({ ...data, id })
      .then(res => {
        setIsLoading(false);
        onUpdate({ index, data: res.data });
        onClose();
        toast({
          title: 'Update',
          description: 'The contact have been  successfully updated ',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(error => {
        setIsLoading(false);
        const { data, status } = error.response;
        setNonFieldErrors([]);
        if (status === 400) {
          handelErrors(data);
        }
      });
  };
  const handelErrors = errors => {
    for (const key in errors) {
      if (key !== 'non_field_errors') {
        setError(key, {
          type: 'focus',
          message: errors[key][0],
        });
      } else {
        setNonFieldErrors(prev => prev.concat(errors[key]));
      }
    }
  };
  return (
    <>
      <Tr>
        <Td>{first_name}</Td>
        <Td>{last_name}</Td>
        <Td>{email}</Td>
        <Td>{is_safe_guard ? 'Yes' : 'No'}</Td>
        <Td>
          <Tooltip label=" Edite contact " aria-label="edite contact">
            <IconButton size="sm" icon={<BiEdit />} onClick={onOpen} m="1" />
          </Tooltip>
          <Popover
            returnFocusOnClose={false}
            isOpen={isOpenPopover}
            onClose={closePopover}
            placement="right"
            closeOnBlur={false}
          >
            <Tooltip label=" Edite contact " aria-label="edite contact">
              <PopoverTrigger>
                <Tooltip label=" Delete contact " aria-label="delete contact">
                  <IconButton
                    size="sm"
                    icon={<AiFillDelete />}
                    onClick={onOpenPopover}
                    bgColor="red.600"
                    m="1"
                  />
                </Tooltip>
              </PopoverTrigger>
            </Tooltip>
            <PopoverContent>
              <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                Are you sure you want to delete this contact?
              </PopoverBody>
              <PopoverFooter d="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button variant="outline" onClick={closePopover}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => deleteContact()}
                    isLoading={isDeleteLoading}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          <Modal
            isOpen={isOpen}
            onClose={handelOnClose}
            // closeOnOverlayClick={false}
            size="2xl"
          >
            <ModalOverlay />
            <form>
              <ModalContent>
                <ModalHeader>Contact</ModalHeader>
                <ModalBody>
                  {nonFieldErrors.length > 0 && (
                    <Alert status="error" p="2" my="2">
                      <AlertIcon />
                      <AlertDescription p="2" mr="2">
                        {nonFieldErrors}
                      </AlertDescription>
                    </Alert>
                  )}
                  {/* Email first name */}
                  <FormControl id="first_name" isInvalid={errors.first_name}>
                    <FormLabel>First name</FormLabel>

                    <Input
                      placeholder="First Name"
                      my="2"
                      {...register('first_name', {
                        value: watchFistName,
                        required: {
                          value: true,
                          message: 'Please enter your first name',
                        },
                        pattern: {
                          value: /^[A-Z]{4,20}$/i,
                          message: 'Enter a valid name',
                        },
                      })}
                    />

                    <FormErrorMessage>
                      {errors.first_name && <>{errors.first_name.message}</>}
                    </FormErrorMessage>
                  </FormControl>
                  {/* Email last name */}
                  <FormControl id="last_name" isInvalid={errors.last_name}>
                    <FormLabel>Last name</FormLabel>

                    <Input
                      placeholder="Last Name"
                      my="2"
                      {...register('last_name', {
                        value: watchLastName,
                        required: {
                          value: true,
                          message: 'Please enter your last name',
                        },
                        pattern: {
                          value: /^[A-Z]{4,20}$/i,
                          message: 'Enter a valid name',
                        },
                      })}
                    />

                    <FormErrorMessage>
                      {errors.last_name && <>{errors.last_name.message}</>}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl py="2" isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="Email"
                      {...register('email', {
                        value: watchEmail,
                        required: { value: true, message: 'Enter your email' },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Enter a valid email address',
                        },
                      })}
                      //   onChange={e => setEmail(e.target.value)}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl py="2" isInvalid={errors.phone}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      placeholder="Phone"
                      {...register('phone', {
                        pattern: {
                          value: /^[0-9+]{10,13}$/i,
                          message: 'Enter a valid phone number',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.phone && errors.phone.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl display="flex" alignItems="center" py="2">
                    <FormLabel htmlFor="email-alerts" mb="0">
                      Is he/she safeguard?
                    </FormLabel>
                    <Switch
                      id="email-alerts"
                      {...register('is_safe_guard', {
                        value: watchIsSafeguard,
                      })}
                      colorScheme="blackAlpha"
                      checked={watchIsSafeguard}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onCancel}>
                    Close
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSubmit(handelUpdate)}
                    disabled={isLoading && formState.isValid}
                    isLoading={isLoading}
                  >
                    Update
                  </Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
        </Td>
      </Tr>
    </>
  );
});

export default Contact;
