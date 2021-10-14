import React from 'react';
import { Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
const PasswordInput = React.forwardRef(({ my, m, ...rest }, ref) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md" m={m} my={my} ref={ref}>
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="Enter password"
        {...rest}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});
export default PasswordInput;
