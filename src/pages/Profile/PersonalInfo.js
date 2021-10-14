import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userService } from '../../services';
import SimplifyAccordionItem from './SimplifyAccordionItem';

const PersonalInfo = ({ title, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [defualtValues, setDefualtValues] = useState({});
  const [isReadingMode, setIsReadingMode] = useState(true);
  const [nonFieldErrors, setNonFieldErrors] = useState([]);
  const staleData = useRef();
  const service = userService();
  const toast = useToast();
  const {
    setError,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const handleSave = data => {
    const chengeData = {};
    for (const key in data) {
      if (staleData.current[key] && staleData.current[key] !== data[key])
        chengeData[key] = data[key];
    }
    if (Object.entries(chengeData).length < 1) {
      setIsReadingMode(true);
      return;
    }
    service
      .update(chengeData)
      .then(res => {
        setIsLoading(false);

        setDefualtValues(res.data);
        toast({
          title: 'Profile informations',
          description: 'Profile informations have been successfully updated ',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        if (chengeData.email) {
          toast({
            title: 'Email activation',
            description:
              'An activation link has been sent to your new e-mail. Active it to be able to continue  ',
            status: 'info',
            duration: 9000,
            isClosable: true,
          });
        }
        staleData.current = { ...staleData.current, ...res.data };
        setIsReadingMode(true);
      })
      .catch(error => {
        setIsLoading(false);
        const { data, status } = error;
        setNonFieldErrors([]);
        if (status === 400) {
          handelErrors(data);
        }
      });
  };
  const handelCancel = () => {
    setIsReadingMode(true);
    reset(defualtValues);
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
  useEffect(() => {
    service
      .get()
      .then(res => {
        setValue('username', res.data.username);
        setValue('email', res.data.email);
        setValue('last_name', res.data.last_name);
        setValue('first_name', res.data.first_name);
        setDefualtValues(res.data);
        staleData.current = res.data;
      })
      .catch(error => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SimplifyAccordionItem title={title} {...rest}>
      <form onSubmit={e => e.preventDefault()}>
        {nonFieldErrors.length > 0 && (
          <Alert status="error" p="2" my="2">
            <AlertIcon />
            <AlertDescription p="2" mr="2">
              {nonFieldErrors}
            </AlertDescription>
          </Alert>
        )}
        {/* Email first name */}
        <FormControl
          id="first_name"
          isInvalid={errors.first_name}
          isReadOnly={isReadingMode}
        >
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
            variant={isReadingMode ? 'filled' : 'outline'}
            _focus={
              isReadingMode
                ? { backgroundColor: 'gray.100' }
                : { borderColor: 'black' }
            }
          />

          <FormErrorMessage>
            {errors.first_name && <>{errors.first_name.message}</>}
          </FormErrorMessage>
        </FormControl>
        {/* Email last name */}
        <FormControl
          id="last_name"
          isInvalid={errors.last_name}
          isReadOnly={isReadingMode}
        >
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
            variant={isReadingMode ? 'filled' : 'outline'}
            _focus={
              isReadingMode
                ? { backgroundColor: 'gray.100' }
                : { borderColor: 'black' }
            }
          />

          <FormErrorMessage>
            {errors.last_name && <>{errors.last_name.message}</>}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isReadOnly={isReadingMode}
          isInvalid={errors.username}
          mt="2"
        >
        </FormControl>
        <FormControl isReadOnly={isReadingMode} isInvalid={errors.email} mt="2">
          <FormLabel>Email address</FormLabel>
          <Input
            {...register('email', {
              required: { value: true, message: 'Name is requierd' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Enter a valid email address',
              },
            })}
            variant={isReadingMode ? 'filled' : 'outline'}
            _focus={
              isReadingMode
                ? { backgroundColor: 'gray.100' }
                : { borderColor: 'black' }
            }
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <Box mt="4" display="flex" justifyContent="end">
          {isReadingMode ? (
            <>
              <Button
                type="button"
                variant="outline"
                mx="2"
                onClick={() => setIsReadingMode(false)}
              >
                Edit
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                mx="2"
                onClick={handleSubmit(handleSave)}
                isLoading={isLoading}
              >
                Save
              </Button>
              <Button mx="2" onClick={handelCancel}>
                Cancel
              </Button>
            </>
          )}
        </Box>
      </form>
    </SimplifyAccordionItem>
  );
};

export default PersonalInfo;
