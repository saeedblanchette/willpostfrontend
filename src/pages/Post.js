import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Loading from '../Componets/Loading';
import { useParams } from 'react-router-dom';
import { anonymousManager } from '../services';
import { Player } from 'video-react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import 'video-react/dist/video-react.css';
const Feedback = ({ status = 'success', title, message }) => {
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
const MediaViewer = ({ data }) => {
  if (!data) return <Loading message="Loading ..." />;
  const media_type = data.media_type;
  const file = data.file;
  return (
    <>
      {media_type === 'AUDIO' ? (
        <>
          <AudioPlayer
            style={{ backgroundColor: '#191f28' }}
            src={file}
            customAdditionalControls={[]}
          />
        </>
      ) : (
        <Player
          src={file}
          playsInline
          autoPlay
          preload="metadata"
          fluid={false}
        ></Player>
      )}
    </>
  );
};
const Post = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setisConfirmed] = useState(false);
  const { urlsignature } = useParams();
  const [data, setData] = useState(null);
  const service = anonymousManager();
  useEffect(() => {
    service
      .post({ urlsignature })
      .then(req => {
        setIsLoading(false);
        setisConfirmed(true);
        const { data } = req;

        setData(data);
      })
      .catch(error => {
        setIsLoading(false);
        setisConfirmed(false);
      });
    setIsLoading(false);
    setisConfirmed(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <Loading message="Loading ..." />;
  return (
    <Box h="100%">
      <Center m="auto" h="80%" w="70%" padding="5">
        {isConfirmed ? (
          <MediaViewer data={data} />
        ) : (
          <Feedback title="Failed" status="error" />
        )}
      </Center>
    </Box>
  );
};

export default Post;
