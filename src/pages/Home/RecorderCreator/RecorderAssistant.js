import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Spacer,
  Tooltip,
} from '@chakra-ui/react';
import React, {  useContext } from 'react';
import PropTypes from 'prop-types';
import { BsFillCameraVideoFill, BsBoxArrowInRight } from 'react-icons/bs';
import { AiFillAudio } from 'react-icons/ai';
import { ComponentsQueue } from './RecorderCreator';
import AudioRecorder from '../../../Componets/AudioRecorder';
import VideoRecorder from '../../../Componets/VideoRecorder';

import AssistantWrapper from './AssistantWrapper';
import SaveRecord from './SaveRecord';
import { CreateRecordContext } from './RecorderCreator';
const ChoiceItem = ({ type, onChoose, title, icon }) => {
  return (
    <Tooltip label={` Click to record using ${type} `}>
      <Flex
        boxShadow="md"
        rounded="md"
        bg="white"
        p="2"
        cursor="pointer"
        m="2"
        _hover={{ bg: 'gray.100', border: '1px' }}
        onClick={() => onChoose(type)}
      >
        <Box flex="1" p="2">
          <Heading size="md"> {title} </Heading>
        </Box>
        <Spacer />
        <Box>
          <Icon as={icon} boxSize="10" />
        </Box>
        <Divider orientation="vertical" bgColor="gray.600" border="2" />
        <Center p="2">
          <Icon as={BsBoxArrowInRight} boxSize="6" color="gray.600" />
        </Center>
      </Flex>
    </Tooltip>
  );
};
const RecorderAssistant = ( ) => {
  const { setMediaType } = useContext(CreateRecordContext);
  const { next, defaultQueue, queue } =
    useContext(ComponentsQueue);

  const handelChoose = type => {
    queue.splice(0, queue.length, ...defaultQueue);
    if (type === 'VIDEO') {
      queue.push(
        <AssistantWrapper
          mainComponent={<VideoRecorder />}
          context={ComponentsQueue}
        />
      );
    } else if (type === 'AUDIO') {
      queue.push(
        <AssistantWrapper
          mainComponent={<AudioRecorder />}
          context={ComponentsQueue}
        />
      );
    }

    queue.push(
      <AssistantWrapper
        mainComponent={<SaveRecord />}
        context={ComponentsQueue}
      />
    );
    setMediaType(type);
    next(true);
  };
  // useEffect(() => {
  //   queue.splice(0, queue.length, ...defaultQueue);
  // }, []);

  return (
    <>

        <Box
          p="2"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Center p="4" bg="gray.100" border="2px">
            <Heading size="md">
              Choose a media medium you like to record with
            </Heading>
          </Center>
          <Divider mb="4" />
          <Box>
            <ChoiceItem
              onChoose={handelChoose}
              type="VIDEO"
              icon={BsFillCameraVideoFill}
              title="Video"
            />
            <ChoiceItem
              onChoose={handelChoose}
              type="AUDIO"
              icon={AiFillAudio}
              title="Audio"
            />
          </Box>
          <Divider my="2" />
        </Box>
     
    </>
  );
};
RecorderAssistant.propTypes = {

  name:PropTypes.string,
};
RecorderAssistant.defaultProps = {
  name:'RecorderAssistant'
};

export default RecorderAssistant;
