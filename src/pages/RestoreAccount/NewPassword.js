import {
  FormHelperText,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PasswordInput from '../../Componets/form/PasswordInput';
import axios from 'axios';
import Loading from '../../Componets/Loading';
import { API_HOST_URL } from '../../constants';
const NewPassword = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { uid, token } = useParams();
  const history = useHistory();
  const onSubmit = data => {
    setIsLoading(true);
    axios
      .post(`${API_HOST_URL}dj-rest-auth/password/reset/confirm/`, {
        ...data,
        uid,
        token,
      })
      .then(res => {
        setIsLoading(false);
        const { status } = res;

        if (status === 200) {
          setIsSuccessful(true);
          setTimeout(() => {
            history.push('/login');
          }, 3000);
        }
      })
      .catch(error => {
        const { data, status } = error.response;
        setIsLoading(false);
        if (status === 400) {
          for (const key in data) {
            setError(key, {
              type: 'focus',
              message: data[key][0],
            });
          }
        }
      });
  };
  return (
    <Center>
      {isSuccessful ? (
        <Loading message="Your password have been successfully changed you will be redirect to login page after sec ...  " />
      ) : (
        <>
          <Stack>
            <Center height="full" w="full">
              <Heading p="2" my="10" as="h1" size="4xl">
                Restore Account
              </Heading>
            </Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                {/* Password Filed */}
                <FormControl id="password" isInvalid={errors.new_password1}>
                  <FormLabel>Password</FormLabel>
                  <PasswordInput
                    placeholder="Password"
                    my="2"
                    {...register('new_password1', {
                      required: {
                        value: true,
                        message: 'Password is Required',
                      },
                    })}
                    isInvalid={errors.password}
                  />
                  <FormHelperText>
                    Use alphabets to make your password stronger .
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors.new_password1 && errors.new_password1.message}
                  </FormErrorMessage>
                </FormControl>
                {/* Re-Password Filed */}
                <FormControl id="repassword" isInvalid={errors.new_password2}>
                  <FormLabel>Re-Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Re-type password"
                    my="2"
                    {...register('new_password2', {
                      required: {
                        value: true,
                        message: 'Please Retype your password',
                      },
                    })}
                  />
                  <FormHelperText>Retype your password .</FormHelperText>
                  <FormErrorMessage>
                    {errors.new_password2 && errors.new_password2.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  variant="solid"
                  my="2"
                  type="submit"
                  isLoading={isLoading}
                >
                  Restore
                </Button>
              </Stack>
            </form>
          </Stack>
        </>
      )}
    </Center>
  );
};

export default NewPassword;
