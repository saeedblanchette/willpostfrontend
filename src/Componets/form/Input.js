import React from 'react';
import { Button  as Chakrainput} from '@chakra-ui/react';

const Input = ({...props}) => {
    return (
       <Chakrainput focusBorderColor="lime" {...props}/>
    );
};

export default Input;