import { Box } from '@chakra-ui/react';
import React from 'react';

const Container = ({children}) => {
    return (
       <Box px={['5','10','28']}> 
           {children}
       </Box>
    );
};

export default Container;