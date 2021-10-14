import {  Center, Heading, Spinner } from '@chakra-ui/react';

const Loading = ({ message }) => {
  return (
    <Center  margin="auto" h="100%">
      <Center h="100%">
        <Heading mx='4' p="2" as="h2">
          {message} 
        </Heading>
        <Spinner thickness="4px" size="xl"></Spinner>
      </Center>
    </Center>
  );
};

export default Loading;
