import {
  Box,
  Circle,
  Icon,
  useDisclosure,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  AlertTitle,
  Divider,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import Continer from '../../Componets/Layout/Continer';
import Nav from '../../Componets/Nav';
import Loading from '../../Componets/Loading';
import Contact from './Contact';
import { ContactService } from '../../services';
import NewContact from './NewContact';

const Contacts = () => {
  const [contactList, setContactList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const service = ContactService();

  const updateContactHandler = ({ index, data }) => {
    const contactListCopy = [...contactList];
    contactListCopy[index] = data;
    setContactList(contactListCopy);
  };
  const deleteContactHandler = index => {
    const contactListCopy = [...contactList];
    contactListCopy.splice(index, 1);
    setContactList(contactListCopy);
  };
  const onCreateHandler = data => {
    const newContactList = [...contactList, data];
    setContactList(newContactList.reverse());
  };

  useEffect(() => {
    setIsDataLoading(true);
    service
      .getList()
      .then(res => {
        setIsDataLoading(false);
        setContactList(res.data);
      })
      .catch(error => {
        setIsDataLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isDataLoading) {
    return (
      <Box h="100%">
        <Nav />
        <Continer h='100%'>
          <Loading mt="9"  message='Loading' />
        </Continer>
      </Box>
    );
  }

  return (
    <>
      <Box h="full">
        <Nav />
        <Continer >
          {contactList.length === 0 ? (
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
                Contacts list
              </AlertTitle>
              <AlertDescription maxWidth="md">
                There is no contact at this moment. create new one
              </AlertDescription>
              <Divider />
              <Button variant="solid" size="lg" my="2" onClick={onOpen}>
                Create new contact
              </Button>
            </Alert>
          ) : (
            <>
              <Table variant="striped" colorScheme="gray" my='5'>
                <Thead>
                  <Tr>
                    <Th>First name</Th>
                    <Th>last name</Th>
                    <Th>Email</Th>
                    <Th>Is safeguard</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {contactList.map((data, index) => (
                    <Contact
                      key={index}
                      name={data.username}
                      index={index}
                      {...data}
                      onUpdate={updateContactHandler}
                      onDelete={deleteContactHandler}
                    />
                  ))}
                </Tbody>
              </Table>

              <Circle
                size="60px"
                bg="black"
                color="white"
                position="fixed"
                bottom="5"
                right="5"
                cursor="pointer"
                onClick={onOpen}
              >
                <Icon as={BsFillPersonPlusFill} boxSize="8" />
              </Circle>
            </>
          )}
        </Continer>
        <NewContact
          onClose={onClose}
          onOpen={onOpen}
          isOpen={isOpen}
          onCreate={onCreateHandler}
        />
      </Box>
    </>
  );
};

export default Contacts;
