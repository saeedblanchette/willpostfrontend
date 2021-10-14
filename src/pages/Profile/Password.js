import React, { useState, useRef } from 'react';
import SimplifyAccordionItem from './SimplifyAccordionItem';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import { userService } from '../../services';
import PasswordInput from '../../Componets/form/PasswordInput';
const passwordMatch = 'The password confirmation does not match';
const Password = ({ title, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nonFieldErrors, setNonFieldErrors] = useState([]);
  const accitem = useRef();
  const service = userService();
  const [isEnabled, setIsEnabled] = useState(false);
  const toast = useToast();

  const {
    setError,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const cancel = () => {
    reset({});
    setIsEnabled(false);
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

  const handleChangePassword = data => {
    service
      .changePassword(data)
      .then(res => {
        toast({
          title: ' Password updated',
          description: 'Your password have been successfully updated ',
          status: 'success',
          duration: 8000,
          isClosable: true,
        });
        setIsLoading(false);
        reset({});
        setIsEnabled(false);
      })
      .catch(error => {
        setIsLoading(false);
        const { data, status } = error.response;
        if (status === 400) {
          setNonFieldErrors([]);
          handelErrors(data);
        }
      });
  };
  return (
    <SimplifyAccordionItem title={title} {...rest} ref={accitem} id="accitem">
      <Box w="full" h="full" position="relative">
        <Box
          w="full"
          h="full"
          bg="white"
          opacity="0.7"
          position="absolute"
          p="10"
          backgroundColor="#F7F7F7"
          zIndex="5"
          display={isEnabled ? 'none' : 'block'}
        >
          <Center w="full" h="full">
            <Button onClick={() => setIsEnabled(true)} zIndex="6">
              Change your password
            </Button>
          </Center>
        </Box>
        <form>
          {nonFieldErrors.length > 0 && (
            <Alert status="error" p="2" my="2">
              <AlertIcon />
              <AlertDescription p="2" mr="2">
                {nonFieldErrors}
              </AlertDescription>
            </Alert>
          )}
          <FormControl py="2" isInvalid={errors.old_password}>
            <FormLabel>Old password </FormLabel>
            <PasswordInput
              placeholder="Old password"
              my="2"
              {...register('old_password', {
                pattern: {
                  value: /^[A-Z0-9._%+-]{8,50}$/i,
                  message: 'Enter a valid password. at least 8 charchtrs',
                },
                required: { value: true, message: 'Old password is required' },
              })}
            />
            <FormErrorMessage>
              {errors.old_password && errors.old_password.message}
            </FormErrorMessage>
            <FormHelperText>Type your new password</FormHelperText>
          </FormControl>
          <FormControl py="2" isInvalid={errors.new_password1}>
            <FormLabel>New password</FormLabel>
            <PasswordInput
              placeholder="New password"
              my="2"
              {...register('new_password1', {
                required: {
                  value: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]{8,50}$/i,
                    message: 'Enter a valid password. at least 8 charchtrs',
                  },
                  message: 'New password is required',
                },
              })}
            />
            <FormErrorMessage>
              {errors.new_password1 && errors.new_password1.message}
            </FormErrorMessage>
            <FormHelperText>Type your new password</FormHelperText>
          </FormControl>
          <FormControl py="2" isInvalid={errors.new_password2}>
            <FormLabel>Password confirmation</FormLabel>
            <Input
              type="password"
              placeholder="Re-type password"
              my="2"
              {...register('new_password2', {
                pattern: {
                  value: /^[A-Z0-9._%+-]{8,50}$/i,
                  message: 'Enter a valid password. at least 8 charchtrs',
                },
                required: {
                  value: true,
                  message: 'Please Retype your password',
                },
                validate: value =>
                  value === getValues().new_password1 || passwordMatch,
              })}
            />
            <FormHelperText>Retype your new password</FormHelperText>
            <FormErrorMessage>
              {errors.new_password2 && errors.new_password2.message}
            </FormErrorMessage>
          </FormControl>
          <Box>
            <HStack justifyContent="right">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSubmit(handleChangePassword)}
                isLoading={isLoading}
              >
                Change password
              </Button>
              <Button variant="solid" size="sm" type="reset" onClick={cancel}>
                Cancel
              </Button>
            </HStack>
          </Box>
        </form>
      </Box>
    </SimplifyAccordionItem>
  );
};

export default Password;
