import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import React from 'react';

const LoadingInfo = () => {
    return (
            <Center h='full'>
            <Box w='50%'>
            <Center h='full'> 
            <Heading m='2' p='2' as='h2'>You will be redirected after sec... </Heading> 
             <Spinner thickness="4px" size='xl'> </Spinner>
              </Center>
            </Box>
        </Center>
    );
};

export default LoadingInfo;