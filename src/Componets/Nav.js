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
import { SITE_NAME } from '../constants';
import OnlyAuth from '../Wrappers/OnlyAuth';
const Nav = () => {
  return (
    <Box w="full"  bg='gray.800' color='white' py='2'>
      <Container>
        <Flex w="full">
          <Box>
            <Heading as="h1" size="xl">{SITE_NAME}</Heading>
          </Box>
          <Spacer />
     
          <OnlyAuth>
          <Wrap spacing={[6, 6, 16]}>
            <WrapItem>
              <Heading as="h2">
                <Tooltip label="Home page" aria-label="Home page">
                  <Link as={RouterLink} to="/Home">
                    <Icon as={AiFillHome}  boxSize='9'/>
                  </Link>
                </Tooltip>
              </Heading>
            </WrapItem>
            <WrapItem>
              <Heading as="h2">
                <Tooltip label="Contact page" aria-label="Contact page">
                  <Link as={RouterLink} to="/contacts">
                    <Icon as={RiContactsFill}  boxSize='9'/>
                  </Link>
                </Tooltip>
              </Heading>
            </WrapItem>
            <WrapItem>
              <Heading as="h2">
                <Tooltip label="Pofile" aria-label="Your Profile" >
                  <Link as={RouterLink} to="/profile">
                    <Icon as={BsFillPersonFill}  boxSize='10' />
                  </Link>
                </Tooltip>
              </Heading>
            </WrapItem>
          </Wrap>
          </OnlyAuth>
        </Flex>
        <Spacer />
      </Container>
    </Box>
  );
};

export default Nav;
