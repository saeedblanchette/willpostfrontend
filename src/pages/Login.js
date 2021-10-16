import {
  Center,
  Heading,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Link,
  FormErrorMessage,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  Flex,
  Divider,
  useToast,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import PasswordInput from '../Componets/form/PasswordInput';

import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { anonymousManager } from '../services';
import PublicOnlyWrapper from '../Wrappers/PublicOnlyWrapper';
const Login = React.forwardRef((props, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [sEmailSent, SetIsEmailSent] = useState(false);
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [nonFieldErrors, setNonFieldErrors] = useState([]);
  const toast = useToast();
  const service = anonymousManager();
  const {
    register,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const resendEmail = () => {
    setIsLoadingEmail(true);
    service
      .resendEmail(getValues())
      .then(res => {
        SetIsEmailSent(true);
      })
      .catch(error => {
        SetIsEmailSent(false);
        const { status } = error.response;
        if (status >= 500) {
          toast({
            title: 'Error',
            description:
              'We are unable to fulfill your request right now.  you  can try later.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          return;
        }
      });
  };
  const onSubmit = data => {
    setIsLoading(true);
    service
      .login(data)
      .then(res => {
        try {
          setIsLoading(false);
          const { data } = res;
          service.setCredentials(data);

          if (data.user.is_expired && data.user.is_expired === true) {
            SetIsEmailSent(true);
          } else {
            history.push('/home');
          }
        } catch (error) {}
      })
      .catch(error => {
        try {
          setIsLoading(false);
          SetIsEmailSent(false);
          const { data, status } = error.response;
          if (status === 500) {
            toast({
              title: 'Error',
              description:
                'We are unable to fulfill your request right now. you  can try later.',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
            setNonFieldErrors([]);
            return;
          }
          if (data['non_field_errors'])
            if (data['non_field_errors'][0].includes('not verified.')) {
              setShowSendEmail(true);
            }
          setNonFieldErrors([]);
          if (status === 400) {
            handelErrors(data);
          }
        } catch (error) {}
      });
  };

  const handelRegister = () => history.push('/register');
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
    <PublicOnlyWrapper>
      <Center h="100%" w="full" ref={ref}>
        {sEmailSent ? (
          <>
            <Box>
              <Center height="full" w="full">
                <Heading p="2" my="10" as="h1" size="4xl">
                  Login
                </Heading>
              </Center>
              <Alert
                status="info"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="150px"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <Divider my="2" />
                {/* <AlertTitle mt={4} mb={1} fontSize="lg">
                  Verification success
                </AlertTitle> */}
                <AlertDescription maxWidth="sm">
                  An email has been sent to you. click on the link it contains.
                  to confirm you authentication
                </AlertDescription>
              </Alert>
            </Box>
          </>
        ) : (
          <>
            <Stack>
              <Center height="full" w="full">
                <Heading p="2" my="10" as="h1" size="4xl">
                  Login
                </Heading>
              </Center>
              <form>
                <Stack>
                  {nonFieldErrors.length > 0 && (
                    <Alert status="error" p="2" my="2">
                      <AlertIcon />
                      <AlertDescription p="2" mr="2">
                        {nonFieldErrors}
                        <Divider />
                        {showSendEmail && (
                          <>
                            <Button
                              size="sm"
                              variant="link"
                              onClick={resendEmail}
                              isLoading={isLoadingEmail}
                            >
                              Send Email verification
                            </Button>
                          </>
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
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
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                  {/* Password Filed */}
                  <FormControl id="password" isInvalid={errors.password}>
                    <FormLabel>Password</FormLabel>
                    <PasswordInput
                      placeholder="Password"
                      my="2"
                      {...register('password', {
                        required: {
                          value: true,
                          message: 'Password is Required',
                        },
                      })}
                      isInvalid={errors.password}
                    />

                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    variant="solid"
                    my="2"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    Log in
                  </Button>
                  <Center>
                    <Text my="2">
                      <Link
                        color="blue.500"
                        as={RouterLink}
                        to="/restore/email/ "
                      >
                        You forgot your password ?
                      </Link>
                    </Text>
                  </Center>
                  <Flex justifyContent="center" justifyItems="center">
                    <Divider />
                    <Divider />
                  </Flex>
                  <Button variant="outline" my="2" onClick={handelRegister}>
                    Register Now
                  </Button>
                </Stack>
              </form>
            </Stack>
          </>
        )}
      </Center>
    </PublicOnlyWrapper>
  );
});

export default Login;
