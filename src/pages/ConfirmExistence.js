import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Loading from '../Componets/Loading';
import { useParams } from 'react-router-dom';
import { anonymousManager } from '../services';
const Feedback = ({ status = 'success', title, message }) => {
  return (
    <Alert
      status={status}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="250px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">{message}</AlertDescription>
    </Alert>
  );
};
const ConfirmExistence = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setisConfirmed] = useState(false);
  const { urlsignature } = useParams();
  const service = anonymousManager();
  useEffect(() => {
    service
      .confirmExistence({urlsignature})
      .then(req => {
        setIsLoading(false);
        setisConfirmed(true);
      })
      .catch(error => {
        setIsLoading(false);
        setisConfirmed(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <Loading message="Loading ..." />;
  else {
    return (
      <Box h="100%">
        <Center m="auto" h="100%" w="35%">
          {isConfirmed ? (
            <Feedback title="Confirmed" />
          ) : (
            <Feedback title="Failed" status="error" />
          )}
        </Center>
      </Box>
    );
  }
};

export default ConfirmExistence;
