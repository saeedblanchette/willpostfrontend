import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Switch,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { ContactService } from '../../services';

const NewContact = ({ onCreate, isOpen, onOpen, onClose }) => {
  const toast = useToast();
  const service = ContactService();
  const [isLoading, setIsLoading] = useState(false);
  const [nonFieldErrors, setNonFieldErrors] = useState([]);
  const {
    register,
    setError,

    handleSubmit,
    formState: { errors },
  } = useForm();

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
  const createNewContactHandler = data => {
    setIsLoading(true);
    service
      .create(data)
      .then(res => {
        setIsLoading(false);
        onCreate(res.data);
        toast({
          title: 'Creation',
          description: 'The contact have been successfully created ',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose();
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
  return (
    <Modal onClose={onClose} isOpen={isOpen} size="2xl">
      <form>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new contact </ModalHeader>

          <ModalBody h="full">
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
                  required: { value: true, message: 'Enter your email' },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Enter a valid email address',
                  },
                })}
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
                  required: false,
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
                Is he safeguard?
              </FormLabel>
              <Switch
                id="email-alerts"
                colorScheme="blackAlpha"
                {...register('is_safe_guard')}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mx="2" variant="outline">
              Close
            </Button>
            <Button
              onClick={handleSubmit(createNewContactHandler)}
              mx="2"
              isLoading={isLoading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
        *
      </form>
    </Modal>
  );
};

export default NewContact;
