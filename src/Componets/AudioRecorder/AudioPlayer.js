import { Box, Flex, Icon, Tooltip } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaStop, FaReply, FaPause } from 'react-icons/fa';
import { RiRecordCircleFill } from 'react-icons/ri';

const AudioPlayer = ({ audioSrc, recordHandler, onPlay, onStop }) => {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  // Refs
  const audioRef = useRef(new Audio(audioSrc));

  // Destructure for conciseness

  const handelPlay = () => {
    audioRef.current.volume = 1.0;
    audioRef.current.play();

    audioRef.current.muted = false;
    if (onPlay) {
      onPlay(audioRef.current);
    }
    setIsPlaying(true);
  };
  const handelStop = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    audioRef.current = new Audio(audioSrc);
    // audioRef.current.crossOrigin = 'anonymous'
    audioRef.current.addEventListener('pause', event => {
      setIsPlaying(false);
      if (onStop) {
        onStop();
      }
    });
  };
  const handelReplay = () => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    // audioRef.current.crossOrigin = 'anonymous'
    audioRef.current.addEventListener('pause', event => {
      setIsPlaying(false);
      if (onStop) {
        onStop();
      }
    });
    audioRef.current.currentTime = 0.0;
    audioRef.current.play();
    setIsPlaying(true);
    if (onPlay) {
      onPlay(audioRef.current);
    }
  };
  const handelPause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    if (onStop) {
      onStop();
    }
  };
  useEffect(() => {
    audioRef.current.pause();

    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
      // audioRef.current.crossOrigin = 'anonymous';
      audioRef.current.addEventListener('pause', event => {
        setIsPlaying(false);
        if (onStop) {
          onStop();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioSrc]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      //   clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <Box border="3px" p="2" position="relative">
      <Flex
        justifyContent="space-around"
        width="40%"
        position="absolute"
        right="30%"
        bottom="20%"
      >
        {isPlaying ? (
          <>
            <Tooltip label="Click to stop" aria-label="Click to stop">
              <Box>
                <Icon
                  as={FaStop}
                  boxSize={14}
                  onClick={handelStop}
                  cursor="pointer"
                />
              </Box>
            </Tooltip>
            <Tooltip label="Click to pause" aria-label="Click to pause">
              <Box>
                <Icon
                  as={FaPause}
                  boxSize={14}
                  onClick={handelPause}
                  cursor="pointer"
                />
              </Box>
            </Tooltip>
            <Tooltip label="Click to replay" aria-label="Click to replay">
              <Box>
                <Icon
                  as={FaReply}
                  boxSize={14}
                  onClick={handelReplay}
                  cursor="pointer"
                />
              </Box>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip label="Click to Play" aria-label="Click to play">
              <Box>
                <Icon
                  as={FaPlay}
                  boxSize={14}
                  onClick={handelPlay}
                  cursor="pointer"
                />
              </Box>
            </Tooltip>

            <Tooltip
              label="Click to start recording"
              aria-label="Click to record"
              placement="left"
              defaultIsOpen
            >
              <Box>
                <Icon
                  as={RiRecordCircleFill}
                  boxSize={16}
                  onClick={recordHandler}
                  cursor="pointer"
                  color="red.500"
                />
              </Box>
            </Tooltip>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default AudioPlayer;
