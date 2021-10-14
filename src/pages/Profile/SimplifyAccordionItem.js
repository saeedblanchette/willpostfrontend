import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react';
import React from 'react';

const SimplifyAccordionItem = React.forwardRef(
  ({ title, children, ...props }, ref) => {
    return (
      <AccordionItem {...props} shadow="lg" my="5" border="4px" h="full">
        <AccordionButton
          bg="gray.800"
          color="white"
          _hover={{ bg: 'gray.600' }}
        >
          <Box flex="1" textAlign="left">
            <Heading as="h3" size="lg">
              {title}
            </Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <AccordionPanel pb={4}>{children}</AccordionPanel>
        </AccordionPanel>
      </AccordionItem>
    );
  }
);
export default SimplifyAccordionItem;
