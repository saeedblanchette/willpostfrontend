import { Box } from '@chakra-ui/layout';
import React, { useEffect, useRef } from 'react';

const AudioVisualizer = ({
  audioContext,
  source,
  enabled,
  connect,
  ...rest
}) => {
  const canvas = useRef();
  const WIDTH = useRef();
  const HEIGHT = useRef();

  const analyser = useRef();
  const dataArray = useRef();
  const bufferLength = useRef();
  const canvasCtx = useRef();

  const drawVisual = useRef();

  const clear = () => {
    if (canvasCtx.current)
      canvasCtx.current.clearRect(0, 0, WIDTH.current, HEIGHT.current);
    window.cancelAnimationFrame(drawVisual.current);
  };

  const visualize = () => {
    if (audioContext && audioContext.current) {
      source.connect(analyser.current);
      if (connect) analyser.current.connect(connect);
      analyser.current.fftSize = 2048;
      bufferLength.current = analyser.current.frequencyBinCount;
      dataArray.current = new Uint8Array(bufferLength.current);
      canvasCtx.current.clearRect(0, 0, WIDTH.current, HEIGHT.current);

      draw();
    }
  };
  const draw = () => {
    drawVisual.current = requestAnimationFrame(draw);
    analyser.current.getByteTimeDomainData(dataArray.current);
    canvasCtx.current.fillStyle = '#FFF';
    canvasCtx.current.fillRect(0, 0, WIDTH.current, HEIGHT.current);
    canvasCtx.current.lineWidth = 2;
    canvasCtx.current.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.current.beginPath();
    const sliceWidth = (WIDTH.current * 1.0) / bufferLength.current;
    let x = 0;
    for (let i = 0; i < bufferLength.current; i++) {
      const v = dataArray.current[i] / 128.0;
      const y = (v * HEIGHT.current) / 2;

      if (i === 0) {
        canvasCtx.current.moveTo(x, y);
      } else {
        canvasCtx.current.lineTo(x, y);
      }

      x += sliceWidth;
    }
    canvasCtx.current.lineTo(canvas.current.width, canvas.current.height / 2);
    canvasCtx.current.stroke();
  };
  useEffect(() => {
    if (audioContext) {
      analyser.current = audioContext.current.createAnalyser();
      WIDTH.current = canvas.current.width;
      HEIGHT.current = canvas.current.height;
      canvasCtx.current = canvas.current.getContext('2d');
    }
  }, [audioContext]);
  useEffect(() => {
    if (source && enabled) {
      visualize();
    } else {
      if (canvasCtx.current) clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, enabled]);

  useEffect(() => {
    return () => {

      clear();
      window.cancelAnimationFrame(drawVisual.current);
    };
  }, []);

  return (
    <Box h="full">
      <canvas ref={canvas} style={{ height: '100%', width: '100%' }}></canvas>
    </Box>
  );
};

export default AudioVisualizer;
