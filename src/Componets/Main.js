import { Button, Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import Header from './Header';

import { useHistory } from 'react-router-dom';
export default function Main() {
  const history = useHistory();
  const handelSignup = () => history.push('/register');
  return (
    <Box
      h="100vh"
      px={['5', '10', '28']}
      bgImage="url('/willpostfrontend/images/background.png')"
      backgroundSize="cover"
      bgPosition="bottom left"
      bgRepeat="no-repeat"
      bgAttachment="scroll"
    >
      <Header />
      <Flex h="90%" flexDirection={['column', 'row']}>
        <Box w={['100%', '50%']} py={['10', '2']}>
          <Flex h="100%" justifyContent="space-around">
            <Box>
              <Heading
                py={['2', '4']}
                as="h1"
                fontSize={['1.3rem', '2.6rem', '2.8rem', '4rem']}
              >
                Say what matter <br /> to who matters
              </Heading>
              <Heading
                fontSize={['1rem', '1.5rem']}
                my={['2', '4']}
                color="gray.600"
              >
                Reprehenderit esse labore id veniam ut veniam non ex adipisicing
                amet ullamco dolor proident.
              </Heading>
              <Spacer />
              <Button variant="solid" m="1" size="lg" onClick={handelSignup}>
                Sign up
              </Button>
            </Box>
          </Flex>
        </Box>
        <Box
          h="100%"
          bgImage="url('/willpostfrontend/images/backimage.svg')"
          backgroundSize="contain"
          bgPosition="bottom"
          bgRepeat="no-repeat"
          w={['100%', '50%']}
        ></Box>
      </Flex>
    </Box>
  );
}
