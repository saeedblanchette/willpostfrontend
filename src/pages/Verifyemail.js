import {
  Box,
  Center,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_HOST_URL } from '../constants';
const Verifyemail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const { key } = useParams();
  const history = useHistory();
  
  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`${API_HOST_URL}dj-rest-auth/registration/verify-email/`, { key: key })
      .then(res => {
        setIsLoading(false);
        setIsVerified(true);
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      })
      .catch(error => {
        setIsLoading(false);
        const { status } = error.response;

        if (status === 400) {
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <Center h="full">
      <Box w="50%">
        {isVerified ? (
          <Alert status="success">
            <AlertIcon />
            Your email have been verified
          </Alert>
        ) : (
          <Center h="full">
            <Heading m="2" p="2" as="h2">
              Verifying ...
            </Heading>
            <Spinner thickness="4px" size="xl"></Spinner>
          </Center>
        )}
      </Box>
    </Center>
  );
};

export default Verifyemail;