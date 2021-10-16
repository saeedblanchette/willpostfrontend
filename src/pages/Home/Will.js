import Icon from '@chakra-ui/icon';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
  Divider,
  Button,
  Box,
  Tag,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Alert,
  Spinner,
  Center,
  Skeleton,
} from '@chakra-ui/react';
import React, {  useEffect, useRef, useState } from 'react';
import { AiFillAudio } from 'react-icons/ai';
import AudioRecorder from '../../Componets/AudioRecorder';
import Card from '../../Componets/Card';
import ContactSelector from '../../Componets/ContactSelector';
import VideoRecorder from '../../Componets/VideoRecorder';
import { ContactService, PostService } from '../../services';
import {
  MdScreenShare,
  MdMoreVert,
  MdDelete,
  MdModeEdit,
} from 'react-icons/md';
const Message = ({ status = 'info', title, message }) => {
  return (
    <Alert
      status={status}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="250px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">{message}</AlertDescription>
    </Alert>
  );
};
const ContacNamesDisplayer = ({ contactsNames,isStillFetching }) => {

  return (
    <Box flex="1" isTruncated wordBreak="break-all" maxWidth="87%">
       <Skeleton isLoaded={!isStillFetching} >
      <HStack  spacing='0.5'>
        {contactsNames.map((obj, index) => (
          <Tag
            fontSize="xs"
            isTruncated
            colorScheme="none"
            // fontWeight="bold"
            key={index}
          >
            {obj.label}
          </Tag>
        ))}
      </HStack>
      </Skeleton>
    </Box>
  );
};
const DisplayPreviewContent = ({ mediaType, file }) => {
  const videRef= useRef()
  const [isLoading,setIsLoading]=useState(true)
  useEffect(()=>{
    if (videRef.current)
    videRef.current.addEventListener('loadeddata', (event) => {
      setIsLoading(false)
    });
  },[])
  if (mediaType === 'VIDEO') {
    return (
      
      <Box
        border="2px"
        borderColor="black"
        margin="auto"
        h="85%"
        backgroundColor="black"
      >
        <Skeleton isLoaded={!isLoading} height='100%'>
        <video src={file} style={{height:'100%'}}  ref={videRef}></video>
        </Skeleton>
      </Box>
    );
  }

  return (
    <Box border="2px" borderColor="black" margin="auto">
      <Icon as={AiFillAudio} boxSize="80%" margin="auto" />
    </Box>
  );
};
const DisplayMediaContent = ({
  mediaType,
  file,
  onRecordHnadler,
  recipients,
  onSelectHandler,
}) => {
  return (
    <>
      {mediaType === 'AUDIO' ? (
        <AudioRecorder extAudioSrcUrl={file} onChange={onRecordHnadler} />
      ) : (
        <VideoRecorder extVideoSrcUrl={file} onChange={onRecordHnadler}/>
      )}
      <Divider my="2" />
      <ContactSelector
        extSelectedContacts={recipients}
        onChange={onSelectHandler}
      />
    </>
  );
};
const DisplayUpdateStatus = ({ isUpdatedSuccessfully,loading }) => {
  if(loading) return(
    <>
    <Center height='100%'>
      <Spinner size="xl" />
     </Center>
    </>
  )
  return (
    <>
      {isUpdatedSuccessfully ? (
        <Message
          status="success"
          title="Will update"
          message="The will has been  Updated"
        />
      ) : (
        <Message
          status="error"
          title="Will update"
          message="The will has not  been  Updated"
        />
      )}
    </>
  );
};
const DisplayContent = ({
  onClose,
  isOpen,
  mediaType,
  file,
  onRecordHnadler,
  recipients,
  onSelectHandler,
  onSaveHandler,
  disbled,
  loading,
  isUpdated,
  isUpdatedSuccessfully = null,
}) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      size="2xl"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />

      <ModalContent p="2">
        <ModalHeader> </ModalHeader>

        <ModalBody h="full" w="100%">
          {isUpdated ? (
            <DisplayUpdateStatus
              isUpdatedSuccessfully={isUpdatedSuccessfully}
              loading={loading}
            />
          ) : (
            <DisplayMediaContent
              mediaType={mediaType}
              file={file}
              onRecordHnadler={onRecordHnadler}
              recipients={recipients}
              onSelectHandler={onSelectHandler}
            />
          )}
        </ModalBody>
        <Box display="flex" flexDirection="row-reverse" my="2">
          <Button
            mx="1"
            onClick={onSaveHandler}
            disabled={disbled}
            isLoading={loading}
          >
            Update
          </Button>

          <Button mx="1" variant="outline" onClick={onClose}>
            Close
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};
const DisplayPreview = ({
  mediaType,
  file,
  onCloseDialog,
  contacts,
  onOpen,
  dialogIsOpen,
  cancelRef,
  onDeletePostHandler,
  onDialogIsOpen,
  isStillFetching,

}) => {
  return (
    <Card
      onClick={onOpen}
      my={['1', '2', '2']}
      mx={['1', '1', '4']}
      p={['1', '2', '4']}
      variant="rounded"
      width={['95%', '95%', '90%', '29%', '29%', '90']}
      border="2px"
      _hover={{ bg: 'gray.100', border: '4px' }}
    >
      {/* {media_type === 'AUDIO' && <Icon as={AiFillAudio} boxSize="60" />} */}
      <DisplayPreviewContent mediaType={mediaType} file={file}  />

      <Box display="flex" mt="2" justifyContent="space-between">
        <Box mx="1">
          <Icon as={MdScreenShare} boxSize="6" />
        </Box>
        <ContacNamesDisplayer contactsNames={contacts} isStillFetching={isStillFetching} />
        <Box mx="1" onClick={e => e.stopPropagation()}>
          <Menu onClick={e => e.stopPropagation()}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<MdMoreVert />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem icon={<MdModeEdit />} onClick={onOpen}>
                Edit..
              </MenuItem>
              <MenuItem
                icon={<MdDelete />}
                onClick={() => onDialogIsOpen(true)}
              >
                Delete
              </MenuItem>
              <AlertDialog
                isOpen={dialogIsOpen}
                leastDestructiveRef={cancelRef}
                onClose={onCloseDialog}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete will
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onCloseDialog}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red.500"
                        onClick={onDeletePostHandler}
                        ml={3}
                        backgroundColor="red.600"
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Card>
  );
};

const Will = ({ media_type, file, recipients, id, onDelete, index }) => {
  const defaultValues = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const service = PostService();
  // valu and names of selected contacts
  const [contacts, setContacts] = useState(recipients);
  const [updatedfile, setUpdatedFile] = useState(file);
  const contactService = ContactService();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isUpdatedSuccessfully, setIsUpdatedSuccessfully] = useState(null);
  const onCloseDialog = () => setDialogIsOpen(false);
  const [isStillFetching, setIsStillFetching] = useState(false);
  const cancelRef = React.useRef();
  const setTimeRef = React.useRef();
  const saveHandler = () => {
    const recipients = contacts.map(val => val.value);
    const values = { id, file: updatedfile, recipients,media_type };
    const updateValues = {};
    for (const key in defaultValues.current) {
      if (values[key] && defaultValues.current[key] !== values[key]) {
        updateValues[key] = values[key];
      }
    }
    if (Object.keys(updateValues).length === 0) return;
    setLoading(true);
    setIsUpdated(true);
    service
      .update(id, {...updateValues,media_type})
      .then(res => {
        setLoading(false);
        setIsUpdatedSuccessfully(true);
        setTimeRef.current = setTimeout(() => {
          onClose();
          setIsUpdated(false);
          setIsUpdatedSuccessfully(false);
        }, 2000);
      })
      .catch(error => {
        try {
          setLoading(false);
          setIsUpdatedSuccessfully(false);
        } catch (error) {}
      });
  };
  const selectHandler = selectdContacts => {
    setContacts(selectdContacts);
  };
  const recordHnadler = file => {
    setUpdatedFile(file);
  };
  const handelDisbled = (() => {
    const recipients = contacts.map(val => val.value);
    const values = { id, file: updatedfile, recipients };

    const updateValues = {};
    for (const key in defaultValues.current) {
      if (
        values[key] &&
        defaultValues.current[key].toString() !== values[key].toString()
      ) {
        updateValues[key] = values[key];
      }
    }

    return (
      Object.keys(updateValues).length === 0 ||
      recipients.length === 0 ||
      isUpdated
    );
  })();
  const deletePostHandler = () => {
    service
      .deleteMedia(id)
      .then(res => {
        onDelete(index);
        onCloseDialog();
      })
      .catch(error => {});
  };
  useEffect(() => {
    let freshContactList = [];
    defaultValues.current = { media_type, file, recipients };
    setIsStillFetching(true)
    if (recipients.length > 0)
      contactService
        .getList()
        .then(res => {
          const data = res.data;
          freshContactList = data.map(value => {
            return {
              value: value.id,
              label: value.first_name + ' ' + value.last_name,
            };
          });
          const selectedItems = freshContactList.filter(opt =>
            recipients.includes(opt.value)
          );
          setContacts(selectedItems);
          setIsStillFetching(false)
        })
        .catch(error => {});
    return () => {
      clearTimeout(setTimeRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DisplayPreview
        mediaType={media_type}
        file={file}
        onCloseDialog={onCloseDialog}
        contacts={contacts}
        onOpen={onOpen}
        dialogIsOpen={dialogIsOpen}
        cancelRef={cancelRef}
        onDeletePostHandler={deletePostHandler}
        onDialogIsOpen={setDialogIsOpen}
        isStillFetching={isStillFetching}
      />
      <DisplayContent
        onClose={onClose}
        isOpen={isOpen}
        mediaType={media_type}
        file={file}
        onRecordHnadler={recordHnadler}
        recipients={recipients}
        onSelectHandler={selectHandler}
        onSaveHandler={saveHandler}
        disbled={handelDisbled}
        loading={loading}
        isUpdated={isUpdated}
        isUpdatedSuccessfully={isUpdatedSuccessfully}
      />
    </>
  );
};

export default Will;
