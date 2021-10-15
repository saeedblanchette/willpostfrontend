import { Flex, Icon, Tooltip, Box, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AudioVisualizer from './AudioVisualizer';
import PropTypes from 'prop-types';
import { FaStop } from 'react-icons/fa';
import { RiRecordCircleFill } from 'react-icons/ri';
import AudioPlayer from './AudioPlayer';
import { useTimer } from '../../pages/Home/RecorderCreator/timer';
const AudioRecorder = ({ extAudioSrcUrl = null, onChange }) => {
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [audioSrcUrl, setAudioSrcUrl] = useState(null);
  const [audioSource, setAudioSource] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [startVisualize, setStartVisualize] = useState(false);
  const audioCtxRef = useRef();
  const [audioCtx, setAudioCtx] = useState(null);
  const mediaRecorder = useRef();
  const { timeString, start, stop} = useTimer();
  const source = useRef();
  const startHandler = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(startRecording);
  };

  const onPlayHandler = audio => {
    const currentSource = audioCtxRef.current.createMediaElementSource(audio);
    source.current = currentSource;
    setAudioSource(currentSource);
    setStartVisualize(true);
    start();
  };
  const onStopHandler = () => {
    setStartVisualize(false);
    stop();
  };
  const startRecording = stream => {
    const options = { mimeType: 'audio/webm' };
    const currentSource = audioCtxRef.current.createMediaStreamSource(stream);
    source.current = currentSource;
    start();
    setAudioSource(currentSource);
    // analyser.current.connect(audioCtxRef.current.destination);
    mediaRecorder.current = new MediaRecorder(stream, options);

    mediaRecorder.current.addEventListener('dataavailable', function (e) {
      if (e.data.size > 0) setRecordedChunks(prev => [e.data]);
    });
    mediaRecorder.current.addEventListener('stop', function () {
      const url = URL.createObjectURL(new Blob(recordedChunks), 'sound.wav');
      setAudioSrcUrl(url);
    });
    setCapturing(true);
    setStartVisualize(true);
    mediaRecorder.current.start();
  };
  const stopRecordingHandler = useCallback(() => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      stopStream(mediaRecorder.current.stream);
    }
    setCapturing(false);
    setStartVisualize(false);
    stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordedChunks]);
  const stopStream = stream => {
    stream.getTracks().forEach(track => track.stop());
  };
  useEffect(() => {
    audioCtxRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    setAudioCtx(audioCtxRef);
  }, []);
  useEffect(() => {
    if (extAudioSrcUrl) {
      setAudioSrcUrl(extAudioSrcUrl);
    }

    return () => {
      if (mediaRecorder.current) {
        stopRecordingHandler();
        setStartVisualize(false);
      }
      if (!extAudioSrcUrl && audioSrcUrl) URL.revokeObjectURL(audioSrcUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extAudioSrcUrl]);
  useEffect(() => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks);
      const url = URL.createObjectURL(blob);
      setAudioSrcUrl(url);
      if (mediaRecorder.current) {
        if (mediaRecorder.current.state === 'inactive') {
          const soundFile = new File([blob], 'sound.wav', {
            type: 'audio/webm',
          });
          if (onChange) onChange(soundFile);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordedChunks]);
  const handleConnect = (() => {
    return audioCtxRef.current && !capturing
      ? audioCtxRef.current.destination
      : null;
  })();
  return (
    <Box h="100%">
      <Box border="8px" w="100%">
        <AudioVisualizer
          source={audioSource}
          enabled={startVisualize}
          audioContext={audioCtx}
          connect={handleConnect}
        />
        <Box position="absolute" top="28" right="20">
          <Text fontSize="lg" fontWeight="bold">
            {timeString}
          </Text>
        </Box>

        {capturing ? (
          <Flex justifyContent="space-around" p="2">
            <Tooltip
              label="Click to stop recording"
              aria-label="Click to stop recording"
            >
              <Box>
                <Icon
                  as={FaStop}
                  boxSize={14}
                  onClick={stopRecordingHandler}
                  cursor="pointer"
                />
              </Box>
            </Tooltip>
          </Flex>
        ) : (
          <>
            {audioSrcUrl ? (
              <AudioPlayer
                audioSrc={audioSrcUrl}
                recordHandler={startHandler}
                onPlay={onPlayHandler}
                onStop={onStopHandler}
              />
            ) : (
              <Flex justifyContent="space-around" p="2">
                <Tooltip
                  label="Click to start recording"
                  aria-label="Click to start recording"
                  placement="left"
                  defaultIsOpen
                >
                  <Box>
                    <Icon
                      as={RiRecordCircleFill}
                      boxSize={16}
                      onClick={startHandler}
                      cursor="pointer"
                      color="red.500"
                    />
                  </Box>
                </Tooltip>
              </Flex>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
AudioRecorder.propTypes = {

  name:PropTypes.string,
};
AudioRecorder.defaultProps = {
  name:'AudioRecorder'
};

export default AudioRecorder;
