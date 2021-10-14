import {
  Box,
  useColorModeValue,
  Container,
  Stack,
  Text,
} from '@chakra-ui/react';

import Main from '../Componets/Main';
import Features from '../Componets/Features';
import HowItWork from '../Componets/HowItWork';
import { SITE_NAME } from '../constants';

export default function LandingPage() {
  return (
    <>
    <Box>
      <Main />
      <Features />
      <HowItWork />
  
    </Box>
    <Box
        mt='10'
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
  
          <Text>© 2021 {SITE_NAME} Templates. All rights reserved</Text>
        </Container>
      </Box>
    </>
  );
}
