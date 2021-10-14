import { Box } from '@chakra-ui/react';
import React from 'react';

const Continer = ({children,...rest}) => {
    return (
        <Box  px={[2,4,16,40,60]}  {...rest} >
            {children}

        </Box>
    );
};

export default Continer;