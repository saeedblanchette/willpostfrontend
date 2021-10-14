import { Square, Circle, Tooltip } from '@chakra-ui/react';
export const RecordButton = props => {
  return (
    <Tooltip label="Click to start recording" placement="left" defaultIsOpen> 
      <Circle
        size="70px"
        bg="white"
        opacity="0.7"
        cursor="pointer"
        position="absolute"
        bottom="25%"
        right="45%"
        p="6"
        border="2px"
        borderColor="black"
      >
        <Circle size="55px" bg="tomato" opacity="1" color="white" {...props} />
      </Circle>
    </Tooltip>
  );
};
export const StopButton = props => {
  // centered button 
  return (
    <Tooltip label="Click to stop recording" placement="left" defaultIsOpen>
      <Circle
        size="70px"
        bg="white"
        opacity="0.7"
        cursor="pointer"
        position="absolute"
        bottom="15%"
        right="45%"
        p="6"
        border="2px"
        borderColor="black"
      >
        <Square size="45px" bg="tomato" opacity="1" {...props}></Square>
      </Circle>
    </Tooltip>
  );
};
