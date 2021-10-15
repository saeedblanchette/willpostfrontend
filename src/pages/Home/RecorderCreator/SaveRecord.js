import {
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/alert';
import { Box, Heading } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import { Progress } from '@chakra-ui/progress';
import React, { useContext, useEffect, useState } from 'react';
import { PostService } from '../../../services';
import { CreateRecordContext } from './RecorderCreator';
import { PostsContext } from '../Home';
import { Spinner } from '@chakra-ui/spinner';
import axios from 'axios';
const CancelToken = axios.CancelToken;
const Cancelsource = CancelToken.source();
const SaveRecord = ({ handleProvousEnable, onChange }) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(true);
  const [isUploadingSuccessed, setIsUploadingSuccessed] = useState(false);
  const service = PostService();
  const { addPost } = useContext(PostsContext);

  const { selectedContacts, mediaType, mediaFile } =
    useContext(CreateRecordContext);
  useEffect(() => {
    service
      .create(
        {
          file: mediaFile,
          media_type: mediaType,
          contacts: selectedContacts,
        },
        progressEvent => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') ||
              progressEvent.target.getResponseHeader(
                'x-decompressed-content-length'
              );
          let val = Math.round((progressEvent.loaded * 100) / totalLength);
          setProgress(val);
          if (val === 100) {
            handleProvousEnable(false);
          }
        },
        Cancelsource
      )
      .then(res => {
        addPost(res.data);
        setUploading(false);
        setIsUploadingSuccessed(true);
        if (onChange) onChange(true);
      })
      .catch(error => {
        setUploading(false);
        setIsUploadingSuccessed(false);
        if (onChange) onChange(false);
        handleProvousEnable(true);
        try {
        } catch (error) {}
      });
    return () => {
      // setSelectedContact([]);
      // setMediaFile(null);
      if (uploading) Cancelsource.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box margin="auto" h="100%" w="100%">
      {uploading ? (
        <>
          <Box>
            <Heading size="md" my="2">
              <Spinner size="sm" mr="2" />
              Uploading
            </Heading>
          </Box>
          <Progress hasStripe value={progress} />
        </>
      ) : (
        <>
          {isUploadingSuccessed ? (
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="250px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Uploading
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                The will has been uploaded successfully
              </AlertDescription>
            </Alert>
          ) : (
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="250px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Uploading
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                The will has not been uploaded
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </Box>
  );
};
SaveRecord.propTypes = {

  name:PropTypes.string,
};
SaveRecord.defaultProps = {
  name:'SaveRecord'
};

export default SaveRecord;
