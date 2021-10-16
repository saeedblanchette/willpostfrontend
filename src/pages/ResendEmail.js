import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    Heading,
    FormLabel,
    Input,
    Stack,
    Alert,
    AlertIcon,
    AlertDescription,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { useForm } from 'react-hook-form';
  import axios from 'axios';
import { API_HOST_URL } from '../constants';
import PublicOnlyWrapper from '../Wrappers/PublicOnlyWrapper';

const ResendEmail = () => {
    const {
        register,
        setError,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const [showSuccessMsg, setShowSuccessMsg] = useState(false);
      const onSubmit = data => {

        axios
          .post(`${API_HOST_URL}/dj-rest-auth/registration/resend-email/`, data)
          .then(({ status, data }) => {
            setShowSuccessMsg(true);
          })
          .catch(error => {
            setShowSuccessMsg(false);
            if (error.response) {
              const { data, status } = error.response;
    
              if (status === 400) {
                for (const key in data) {
                  setError(key, {
                    type: 'focus',
                    message: data[key][0],
                  });
                }
              }
            }
          });
      };
      return (
        <PublicOnlyWrapper>
        <Center>
          <Stack>
            <Center height="full" w="full">
              <Heading p="2" my="10" as="h1" size="4xl">
               Send Email verification
              </Heading>
            </Center>
           
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                {showSuccessMsg && (
                  <Alert status="success" p="2" my="2">
                    <AlertIcon />
                    <AlertDescription p="2" mr="2">
                    Activation link had been sent to your email
                    </AlertDescription>
                  </Alert>
                )}
                {errors.non_field_errors && (
                  <Alert status="error" p="2" my="2">
                    <AlertIcon />
                    <AlertDescription p="2" mr="2">
                      {errors.non_field_errors.message}
                    </AlertDescription>
                  </Alert>
                )}
                <FormControl id="email" isInvalid={errors.email} my="2">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
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
                  ></Input>
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <Button type="submit" my="2">
                  Restore
                </Button>
              </Stack>
            </form>
          </Stack>
        </Center>
        </PublicOnlyWrapper>
      );
    };


export default ResendEmail;