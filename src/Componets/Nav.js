import {
  Box,
  Heading,
  Spacer,
  Flex,
  WrapItem,
  Wrap,
  Icon,
  Link,
  Tooltip,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { RiContactsFill } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';
import React from 'react';
import Container from './Layout/Continer';
const Nav = () => {
  return (
    <Box w="full"  bg='gray.800' color='white' py='2'>
      <Container>
        <Flex w="full">
          <Box>
            <Heading as="h1" size="2xl">Logo</Heading>
          </Box>
          <Spacer />

          <Wrap spacing={[6, 6, 16]}>
            <WrapItem>
              <Heading as="h2">
                <Tooltip label="Home page" aria-label="Home page">
                  <Link as={RouterLink} to="/Home">
                    <Icon as={AiFillHome} />
                  </Link>
                </Tooltip>
              </Heading>
            </WrapItem>
            <WrapItem>
              <Heading as="h2">
                <Tooltip label="Contact page" aria-label="Contact page">
                  <Link as={RouterLink} to="/contacts">
                    <Icon as={RiContactsFill} />
                  </Link>
                </Tooltip>
              </Heading>
            </WrapItem>
            <WrapItem>
              <Heading as="h2">
                <Tooltip label="Pofile" aria-label="Your Profile">
                  <Link as={RouterLink} to="/profile">
                    <Icon as={BsFillPersonFill} />
                  </Link>
                </Tooltip>
              </Heading>
            </WrapItem>
          </Wrap>
          
        </Flex>
        <Spacer />
      </Container>
    </Box>
  );
};

export default Nav;
