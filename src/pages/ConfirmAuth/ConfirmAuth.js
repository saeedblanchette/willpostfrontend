import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { Center, Divider } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../../Componets/Loading';
import { authManager } from '../../services';

const ReSandMessage = ({
  onReSend,
  isSendEmailVerification,
  isReSendSuccessfuly,
}) => {
  return (
    <>
      {isReSendSuccessfuly ? (
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="250px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Email verification
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Activation link had been sent to your email. Click on it to login
          </AlertDescription>
        </Alert>
      ) : (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="250px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Verification failure
          </AlertTitle>
          <AlertDescription maxWidth="md">
            Sorry!. We are unable to verify you. try to re-send a new email
            verification by clicking on the button below. and check your email
          </AlertDescription>
          <Divider />
          <Button
            variant="solid"
            size="lg"
            my="2"
            onClick={onReSend}
            isLoading={isSendEmailVerification}
          >
            Re-send
          </Button>
        </Alert>
      )}
    </>
  );
};
const ConfirmAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReSendSuccessfuly, setReSendSuccessfuly] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(null);
  const [isSendEmailVerification, setisSendEmailVerification] = useState(false);
  const { uid, token } = useParams();
  const history = useHistory();
  const service = authManager();
  useEffect(() => {
    setIsLoading(true);
    service
      .confirmLogin({ uid, token })
      .then(res => {
        setIsLoading(false);
        setIsSuccessful(true);
        setTimeout(() => history.push('/home'), 4000);
      })
      .catch(error => {
        setIsLoading(false);
        setIsSuccessful(false);
        // const { data, status } = error.response;
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const reSendHandler = () => {
    setisSendEmailVerification(true);
    service
      .reSendVerification()
      .then(res => {
        setisSendEmailVerification(false);
        setReSendSuccessfuly(true);
      })
      .catch(error => {
        setisSendEmailVerification(false);
      });
  };
  return (
    <Center height="100%">
      <Box w="30%" h="50%">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isSuccessful ? (
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="250px"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Verification success
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  You will be redirected to the homepage after few seconds
                </AlertDescription>
              </Alert>
            ) : (
              <ReSandMessage
                onReSend={reSendHandler}
                isSendEmailVerification={isSendEmailVerification}
                isReSendSuccessfuly={isReSendSuccessfuly}
              />
            )}
          </>
        )}
      </Box>
    </Center>
  );
};

export default ConfirmAuth;
