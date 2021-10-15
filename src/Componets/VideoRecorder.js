import {
  Box,
  Button,
  useToast,
  Tooltip,
  Heading,
  Center,
  Icon,
  Circle,
  Square,
  IconButton,
} from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { RecordButton } from '../pages/Home/RecorderCreator/buttons';
import { useTimer } from '../pages/Home/RecorderCreator/timer';
import { RiVideoAddLine } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { Player, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';
const Controls = ({ isPaused, timeString, onResume, onPause, onStop }) => {
  return (
    <>
      <Heading position="absolute" right="5%" top="10%" size="md" color="white">
        {timeString}
      </Heading>
      <Box
        position="absolute"
        bottom="20%"
        right="35%"
        display="flex"
        justifyContent="space-between"
        w="30%"
      >
        <Tooltip label="Click to stop recording" placement="left" defaultIsOpen>
          <Circle
            size="60px"
            bg="white"
            opacity="0.7"
            cursor="pointer"
            p="6"
            border="2px"
            borderColor="black"
            onClick={onStop}
          >
            <Square size="35px" bg="tomato" opacity="1"></Square>
          </Circle>
        </Tooltip>
        {isPaused ? (
          <>
            <Tooltip label="Click to resume" aria-label="Click to resume">
              <Circle
                size="60px"
                bg="white"
                opacity="0.7"
                cursor="pointer"
                p="4"
                border="2px"
                borderColor="black"
                onClick={onResume}
              >
                <Icon ml="1" as={FaPlay} boxSize={10} cursor="pointer" />
              </Circle>
            </Tooltip>
          </>
        ) : (
          <Tooltip label="Click to pause" aria-label="Click to pause">
            <Circle
              size="60px"
              bg="white"
              opacity="0.7"
              cursor="pointer"
              p="6"
              border="2px"
              borderColor="black"
              onClick={onPause}
            >
              <Icon as={FaPause} boxSize={10} cursor="pointer" />
            </Circle>
          </Tooltip>
        )}
      </Box>
    </>
  );
};

const VideoRecorder = ({ extVideoSrcUrl, onChange }) => {
  const webcamRef = useRef(null);
  const videoRef = useRef(null);
  const sourceRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const [videoURL, setVideoURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCameraturnOn, setIsCameraturnOn] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordingMode, setRecordingMode] = useState(false);
  const { timeString, start, stop, pause, resume } = useTimer();
  const toast = useToast();

  const stopStream = stream => {
    stream.getTracks().forEach(track => track.stop());
  };
  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks(prev => prev.concat(data));
    }
  };
  const handelPause = () => {
    mediaRecorderRef.current.pause();
    setIsPaused(true);
    pause();
  };
  const handelResume = () => {
    mediaRecorderRef.current.resume();
    setIsPaused(false);
    resume();
  };
  const handleStartCaptureClick = () => {
    setCapturing(true);
    setRecordedChunks([]);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current, {
      mimeType: 'video/webm',
    });
    start();
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    if (videoRef.current) {
      if (window.URL) {
        videoRef.current.srcObject = webcamRef.current;
      } else {
        videoRef.current.src = webcamRef.current;
      }
      videoRef.current.controls = false;
      videoRef.current.muted = true;
    }
    mediaRecorderRef.current.addEventListener('stop', () => {
      // stopStream(webcamRef.current);
    });
    mediaRecorderRef.current.start(1000);
  };
  const TurnOnCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        webcamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = webcamRef.current;

          videoRef.current.muted = true;
        }
        setIsCameraturnOn(true);
      })
      .catch(error => {
        stopStream(webcamRef.current);
        toast({
          title: 'Not Allowd .',
          description: 'We need pirmisionss.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };
  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();

    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      videoRef.current.srcObject = null;
      if (onChange) {
        onChange(new File([blob], 'video.webm'));
      }
      setVideoURL(url);
      videoRef.current.src = url;
      videoRef.current.load();
      videoRef.current.controls = true;
      videoRef.current.muted = false;
      videoRef.current.play();
    }
    stop();
    setCapturing(false);
  };

  const setVideoRef = dom => {
    if (dom) {
      videoRef.current = dom;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (window.URL) {
        videoRef.current.srcObject = webcamRef.current;
      } else {
        videoRef.current.src = webcamRef.current;
      }
      videoRef.current.muted = true;
    }
  }, [isCameraturnOn]);
  useEffect(() => {
    if (extVideoSrcUrl) {
      videoPlayerRef.current.autoplay = false;
      videoPlayerRef.current.src = extVideoSrcUrl;
      videoPlayerRef.current.load();
      videoPlayerRef.current.controls = true;
    }
    return () => {
      if (webcamRef.current) stopStream(webcamRef.current);
      if (videoURL) URL.revokeObjectURL(videoURL);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extVideoSrcUrl]);
  useEffect(() => {
    // if (recordedChunks.length) {
    //   const blob = new Blob(recordedChunks, {
    //     type: 'video/webm',
    //   });
    //   if (onChange) {
    //     onChange(new File([blob], 'video.webm'));
    //   }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordedChunks]);
  return (
    // <video ref={setVideoRef} width="620" autoPlay height="100%"></video>
    <Box position="relative">
      {extVideoSrcUrl && !recordingMode ? (
        <Player
          ref={videoPlayerRef}
          playsInline
          autoPlay
          width="620"
          height="100%"
        >
          <source src={extVideoSrcUrl} ref={sourceRef} />
          <ControlBar>
            <IconButton
              order={7}
              icon={<RiVideoAddLine />}
              onClick={() => setRecordingMode(true)}
              aria-label="Start Recording"
              style={{ fontSize: '24px' }}
              fontSize="40px"
            />
          </ControlBar>
        </Player>
      ) : (
        <>
          {isCameraturnOn ? (
            <video ref={setVideoRef} width="620" autoPlay height="100%"></video>
          ) : (
            <Center bg="black" h="60" minW="xl">
              <Button variant="outline" onClick={TurnOnCamera}>
                Turn The camera on
              </Button>
            </Center>
          )}
          {capturing ? (
            <Controls
              onPause={handelPause}
              onResume={handelResume}
              isPaused={isPaused}
              timeString={timeString}
              onStop={handleStopCaptureClick}
            />
          ) : (
            <>
              {webcamRef.current && (
                <>
                  <RecordButton onClick={handleStartCaptureClick} />
                </>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};
VideoRecorder.propTypes = {

  name:PropTypes.string,
};
VideoRecorder.defaultProps = {
  name:'VideoRecorder'
};

export default VideoRecorder;
