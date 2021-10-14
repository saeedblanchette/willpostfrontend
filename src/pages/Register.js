import React, { useState } from 'react';
import {
  Center,
  Heading,
  Stack,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Text,
  Link,
  useToast,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import PasswordInput from '../Componets/form/PasswordInput';
import { Link as RouterLink } from 'react-router-dom';
// import Input from '../componets/form/Input';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { API_HOST_URL } from '../constants';

const Register = () => {
  const toast = useToast();
  const [isLoading, setIsloading] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [nonFieldErrors, setNonFieldErrors] = useState([]);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {

    setIsloading(true);
    axios
      .post(`${API_HOST_URL}dj-rest-auth/registration/`, data)
      .then(res => {
        const { status } = res;
        if (status >= 200) {
          setShowSuccessMsg(true);
          setIsloading(false);
        }
      })
      .catch(error => {
        setIsloading(false);

        if (error.response) {
          const { data, status } = error.response;
          if (status < 500) {

            setNonFieldErrors([]);
            handelErrors(data);
          } else {
            toast({
              title: 'An error occured',
              description: 'please try again after few sec',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
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
  if (showSuccessMsg) {
    return (
      <Center h="100%">
        <Box w="30%" h="50%">
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="250px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg"></AlertTitle>
            <AlertDescription maxWidth="sm">
              Your account has been successfully created.
              <br /> check your email to verify your email address
            </AlertDescription>
          </Alert>
        </Box>
      </Center>
    );
  }
  return (
    <Center h="100%">
      <Stack p="2" m="2">
        <Center height="100%" w="100%">
          <Heading p="2" my="6" as="h1" size="4xl">
            Sign up
          </Heading>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            {showSuccessMsg && (
              <Alert status="success" p="2" my="2">
                <AlertIcon />
                <AlertDescription p="2" mr="2">
                  Your account has been successfully created.
                  <br /> check your email to verify your email address
                </AlertDescription>
              </Alert>
            )}
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
            {/* Email Filed */}
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>

              <Input
                placeholder="Email"
                my="2"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Please enter your email address',
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Enter a valid email address',
                  },
                })}
              />

              <FormErrorMessage>
                {errors.email && <>{errors.email.message}</>}
              </FormErrorMessage>
            </FormControl>
            {/* Password Filed */}
            <FormControl id="password" isInvalid={errors.password1}>
              <FormLabel>Password</FormLabel>
              <PasswordInput
                placeholder="Password"
                my="2"
                {...register('password1', {
                  required: { value: true, message: 'Password is Required' },
                })}
                isInvalid={errors.password1}
              />
              <FormHelperText>
                Use alphabets to make your password stronger
              </FormHelperText>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            {/* Re-Password Filed */}
            <FormControl id="password2" isInvalid={errors.password2}>
              <FormLabel>Re-Password</FormLabel>
              <Input
                type="password"
                placeholder="Re-type password"
                my="2"
                {...register('password2', {
                  required: {
                    value: true,
                    message: 'Please Retype your password',
                  },
                  validate: value =>
                    value === getValues().password1 ||
                    "it doesn't match the password",
                })}
              />
              <FormHelperText>Retype your password .</FormHelperText>
              <FormErrorMessage>
                {errors.password2 && errors.password2.message}
              </FormErrorMessage>
            </FormControl>
            <Button variant="solid" my="2" type="submit" isLoading={isLoading}>
              Sign in
            </Button>
            <Center>
              <Text my="2">
                Already have an account.
                <Link color="blue.500" as={RouterLink} to="/login">
                  Login
                </Link>
              </Text>
            </Center>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
};

export default Register;
