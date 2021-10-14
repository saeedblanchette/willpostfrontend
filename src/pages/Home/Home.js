import {
  Box,
  Flex,
  Circle,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  Tooltip,
  Alert,
  AlertIcon,
  AlertTitle,
  Divider,
  Button,
  AlertDescription,
} from '@chakra-ui/react';
import React, { createContext, useEffect, useState } from 'react';
import { RiMailAddLine } from 'react-icons/ri';
import Loading from '../../Componets/Loading';
import Continer from '../../Componets/Layout/Continer';
import Nav from '../../Componets/Nav';
import Will from './Will';
import RecorderCreator from './RecorderCreator';
import AuthWarapper from '../../Wrappers/AuthWarapper';
import { PostService } from '../../services';
export const RecorderContext = createContext();
export const PostsContext = createContext();
const Home = () => {
  const [isPostsLoading, setIsPostLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const service = PostService();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setIsPostLoading(true);
    service
      .getList()
      .then(res => {
        setIsPostLoading(false);
        setPosts(res.data);
      })
      .catch(error => {
        setIsPostLoading(false);
        try {
        } catch (error) {}
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isPostsLoading)
    return (
      <Box h="100%">
        <Nav />
        <Continer height="100%">
          <Loading m="auto" message="Loading" />
        </Continer>
      </Box>
    );
  const handelDelete = index => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };
  const addPost=(newPost)=>{
    const values=[...posts]
    setPosts([newPost,...values])
  }
  return (
    <AuthWarapper>
       <PostsContext.Provider value={{addPost}}>
      {/* <AuthWarapper> */}
      <Box h="100%">
        <Nav />
        <Continer minH="90%">
       
          <Box backgroundColor="#EDEDED" minH="91vh">
            {posts.length === 0 ? (
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
                  Create a new Will
                </AlertTitle>
                <AlertDescription maxWidth="md">
                  There is no Will at this moment. create new one
                </AlertDescription>
                <Divider />
                <Button variant="solid" size="lg" my="2" onClick={onOpen}>
                  Create a will
                </Button>
              </Alert>
            ) : (
              <Flex
                pt="10"
                px={['1', '2']}
                flexWrap={['nowrap', 'nowrap', 'wrap']}
                flexBasis="1"
                flexDirection={['column', 'column', 'row']}
              >
                {posts.map((value, index) => (
                  <Will
                    {...value}
                    key={index}
                    index={index}
                    onDelete={handelDelete}
                  />
                ))}
              </Flex>
            )}
          </Box>
       
          <Tooltip label="Create new will" aria-label="Create New Will">
            <Circle
              size="60px"
              cursor="pointer"
              bg="black"
              color="white"
              position="fixed"
              bottom="5"
              right="5"
              onClick={onOpen}
            >
              <Icon as={RiMailAddLine} boxSize="8" />
            </Circle>
          </Tooltip>
        </Continer>
      </Box>
      <RecorderContext.Provider value={{ onClose }}>
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          size="2xl"
          minH="6200px"
          closeOnOverlayClick={false}
        >
          <ModalOverlay />

          <ModalContent p="2" minH="500px">
            <ModalHeader>New will </ModalHeader>

            <ModalBody h="90%">
              <RecorderCreator />
            </ModalBody>
            {/* <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter> */}
          </ModalContent>
        </Modal>
      </RecorderContext.Provider>
      {/* </AuthWarapper> */}
      </PostsContext.Provider>
      </AuthWarapper>
  );
};

export default Home;
