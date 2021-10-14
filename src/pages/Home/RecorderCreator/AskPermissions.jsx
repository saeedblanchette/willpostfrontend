import { Button, Center, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import {PermissionsContext} from './RecorderCreator';
const AskPermissions = ({ video, audio,device, ...rest }) => {
const {arePermissionsgranted, setArePermissionsgranted} = useContext(PermissionsContext)
  const toast = useToast();

  const getPermissions = () => {
    navigator.mediaDevices
      .getUserMedia({ video: video, audio: audio })
      .then(stream => {
        setArePermissionsgranted(true);
      })
      .catch(error => {
        setArePermissionsgranted(false);
        toast({
          title: 'Permissions denied .',
          description: 'Allow the app  permissions to start recording.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      });
  };
  return (
    <Center bg="black" minH="44" minW="56" w="full" h="full">
      <Button onClick={getPermissions} variant="outline">
        Turn on the {device}
      </Button>
    </Center>
  );
};

export default AskPermissions;
