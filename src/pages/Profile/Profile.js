import { Accordion, Box, Button, Divider } from '@chakra-ui/react';
import React from 'react';
import Continer from '../../Componets/Layout/Continer';
import Nav from '../../Componets/Nav';
import { userService } from '../../services';
import Password from './Password';
import PerssonalInfo from './PersonalInfo';
import { useHistory } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import WillSettings from './WillSettings';
const Profile = () => {
  const history = useHistory();
  const service = userService();
  const logout = () => {
    service
      .logout()
      .then(res => {
        history.push('/');
      })
      .catch();
  };

  return (
    <Box h="100%">
      <Nav />
      <Continer>
      <Box backgroundColor="#F7F7F7" minH="91vh" p='1'>
        <Box display="flex" justifyContent="flex-end" >
          <Button variant="outline" onClick={logout} my='1' leftIcon={<RiLogoutCircleRLine/>} >
            Logout
          </Button>
        </Box>
        <Divider />
        <Box >
          <Accordion allowMultiple allowToggle>
            <PerssonalInfo title="Personal Informations" />
            <Password title="Changing Password" />
            <WillSettings title='Will Settings'/>
          </Accordion>
        </Box>
        </Box>
      </Continer>
    </Box>
  );
};

export default Profile;
