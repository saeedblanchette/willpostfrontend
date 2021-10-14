import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  ButtonGroup,
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
const VoteHolder = ({ urlsignature }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const service = anonymousManager();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setisConfirmed] = useState(false);
  const [isVoteSent, setIsVoteSent] = useState(false);
  const handelVote = value => {
    setIsLoading(true);

    service
      .vote({ urlsignature, vote_value: value })
      .then(req => {
        setIsLoading(false);
        setIsVoteSent(true);
        setisConfirmed(true);
      })
      .catch(error => {
        setIsLoading(false);
        setIsVoteSent(true);
        setisConfirmed(false);
      });
  };
  if (isLoading) return <Loading message="Loading ..." />;
  if (isVoteSent) {
    return (
      <Box
        w="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        {isConfirmed ? (
          <Feedback
            title="Vote Successed"
            message="Your Vote has been recorded successfully"
          />
        ) : (
          <Feedback title="Vote Failed" status="error" />
        )}
      </Box>
    );
  }
  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
    >
      <Feedback title="Voting" status="info" />

      <Box display="flex" justifyContent="space-around" my="5">
        <Button
          size="lg"
          backgroundColor="green.600"
          onClick={() => handelVote(2)}
        >
          Yes
        </Button>

        <Popover
          returnFocusOnClose={false}
          isOpen={isOpen}
          onClose={close}
          placement="right"
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <Button size="lg" backgroundColor="red.600" onClick={() => open()}>
              No
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>Are you sure you want vote No?</PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={close}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={() => handelVote(1)}>
                  Vote No
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  );
};
const Vote = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setisConfirmed] = useState(false);
  const { urlsignature } = useParams();
  const service = anonymousManager();
  useEffect(() => {
    service
      .VoteEligibility({ urlsignature })
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
  return (
    <Box h="100%">
      <Center m="auto" h="100%" w="35%">
        {isConfirmed ? (
          <VoteHolder urlsignature={urlsignature} />
        ) : (
          <Feedback title="Failed" status="error" />
        )}
      </Center>
    </Box>
  );
};

export default Vote;
