import {
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Link
} from '@chakra-ui/react';
// import { LinkIcon } from '@chakra-ui/icons'
import React, { useContext, useEffect, useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { RiArrowLeftFill } from 'react-icons/ri';
import { CreateRecordContext } from './RecorderCreator';
import { RecorderContext } from '../Home';
import { useAsyncReference } from '../../../Componets/utils';
const AssistantWrapper = ({ mainComponent, context, children, ...rest }) => {
  const [disabledNext, setDisabledNext] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [showContactsInfo, SetShowContactsInfo] = useState(false);
  const [provousEnabled, setProvousEnabled] = useState(true);
  const { onClose } = useContext(RecorderContext);
  const [childWithProps, setChildWithProps] = useAsyncReference(mainComponent);
  const {
    selectedContacts,
    setSelectedContact,
    setMediaType,
    setMediaFile,
    mediaFile,
  } = useContext(CreateRecordContext);

  const { previous, hasProvous, hasNext, next } = useContext(context);
  const handelSave = () => {
    if (hasNext) next();
  };
  const onChangeHandeler = value => {
    const typeName = mainComponent.type.name;
    switch (typeName) {
      case 'ContactSelector':
        const ids = value.map(contacts => contacts.value);
        setSelectedContact(ids);
        setDisabledNext(false);
        if (ids.length === 0) setDisabledNext(true);
        break;
      case 'AudioRecorder':
        setMediaFile(value);
        setDisabledNext(false);
        break;
      case 'VideoRecorder':
        setDisabledNext(false);
        setMediaFile(value);
        break;
      case 'RecorderAssistant':
        setMediaType(value);
        setDisabledNext(false);
        break;
      case 'SaveRecord':
        setIsEnded(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const typeName = mainComponent.type.name;

    let com;
    let url = null;
    switch (typeName) {
      case 'ContactSelector':
        if (selectedContacts.length === 0) setDisabledNext(true);
        com = React.cloneElement(mainComponent, {
          onChange: onChangeHandeler,
          extSelectedContacts: [...selectedContacts],
          ids: selectedContacts,
        });
        setChildWithProps(com);
        SetShowContactsInfo(true);
        
        break;
      case 'AudioRecorder':
        if (mediaFile === null) {
          setDisabledNext(true);
        } else {
          url = URL.createObjectURL(mediaFile);
          setDisabledNext(false);
        }

        com = React.cloneElement(mainComponent, {
          onChange: onChangeHandeler,
          extAudioSrcUrl: url,
        });
        setChildWithProps(com);
        break;
      case 'VideoRecorder':
        if (mediaFile === null) {
          setDisabledNext(true);
        } else {
          setDisabledNext(false);

          url = URL.createObjectURL(mediaFile);
        }

        com = React.cloneElement(mainComponent, {
          onChange: onChangeHandeler,
          extVideoSrcUrl: url,
        });

        setChildWithProps(com);
        break;
      case 'RecorderAssistant':
        if (mediaFile === null) setDisabledNext(true);
        com = React.cloneElement(mainComponent, {
          onChange: onChangeHandeler,
        });
        break;
      case 'SaveRecord':
        com = React.cloneElement(mainComponent, {
          onChange: onChangeHandeler,
          handleProvousEnable: val => setProvousEnabled(val),
        });
        setDisabledNext(true);
        setChildWithProps(com);
        break;
      default:
        com = React.cloneElement(mainComponent, {
          onChange: onChangeHandeler,
        });
        setDisabledNext(true);
        setChildWithProps(com);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainComponent]);

  return (
    <Box
      w="100%"
      minH="389px"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Box w="100%" margin="auto">
        {showContactsInfo && (
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="250px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Contacts
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Select contacts you want them to receive your Will. or 
              <Link as={LinkRouter} to="/contacts" ><Text color="teal.500">create new Contact</Text>  </Link>
            </AlertDescription>
          </Alert>
        )}
        {childWithProps.current}
      </Box>
      <Box display="flex" flexDirection="row-reverse" my="2">
        <Button mx="1" onClick={handelSave} disabled={disabledNext}>
          {hasNext ? 'Next' : 'Save'}
        </Button>
        {hasProvous && provousEnabled && (
          <Button
            variant="outline"
            onClick={previous}
            mx="2"
            leftIcon={<RiArrowLeftFill />}
          >
            Previous
          </Button>
        )}
        <Button mx="1" variant="outline" onClick={onClose}>
          {isEnded ? 'Close' : 'Cancel'}
        </Button>
      </Box>
    </Box>
  );
};

export default AssistantWrapper;
