import {
  Flex,
  Spacer,
  Heading,
  Box,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { SITE_NAME } from '../constants';
const Header = () => {
  const size = useBreakpointValue({
    base: 'sm',
    md: 'md',
    lg: 'lg',
    sm: 'sm',
    xs: 'xs',
  });
  const history = useHistory();
  const handelLogin = () => history.push('/login');
  const handelSignup = () => history.push('/register');

  return (
    <Box py="2">
      <Flex>
        <Box>
          <Heading size="lg" as="h1">
            {SITE_NAME  }
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Button mr="4" size={size} onClick={handelSignup}>
            Sign Up
          </Button>
          <Button variant="outline" size={size} onClick={handelLogin}>
            Log in
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
export default Header;
