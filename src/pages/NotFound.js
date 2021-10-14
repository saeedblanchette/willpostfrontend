import { Center, Heading } from '@chakra-ui/react';
import React from 'react';
import Nav from '../Componets/Nav';
const NotFound = () => {
  return (
    <>
    <Nav/>
      <Center h="90%">
        <Heading>404 Page Not Found</Heading>
      </Center>
    </>
  );
};

export default NotFound;
