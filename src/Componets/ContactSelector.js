import { Box, Heading,Skeleton } from '@chakra-ui/react';
import React, {useEffect, useRef, useState } from 'react';
import { ContactService } from '../services';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
const ContactSelector = ({
  extSelectedContacts,
  recorderContext,
  onChange,
  ids,
  ...rest
}) => {
  // @param extSelectedContacts list of contacts IDs

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contactList, setContactList] = useState([]);
  const service = ContactService();
  const [isLoading, setIsLoading] = useState(false);
  const thisComponet=useRef()
  const handleChange = values => {
    if (onChange) onChange(values);
    setSelectedContacts(values);
  };
  const customStyles = {
    container: (provided, state) => ({
      ...provided,

      width: '100%',
    }),
  };
  const filterColors = inputValue => {
    return contactList.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const promiseOptions = inputValue =>
    new Promise(resolve => {
      resolve(filterColors(inputValue));
    });
  useEffect(() => {
    let freshContactList = [];
    setIsLoading(true);
    service
      .getList()
      .then(res => {
        const data = res.data;
        freshContactList = data.map(value => {
          return { value: value.id, label: value.email };
        });
        setContactList(freshContactList);
        if (extSelectedContacts.length > 0) {
          const selectedItems = freshContactList.filter(opt =>
            extSelectedContacts.includes(opt.value)
          );
          setSelectedContacts(selectedItems);
        }
        setIsLoading(false);
      })
      .catch(error => {
        try {
        } catch (error) {}
      });
      
      thisComponet.current.setAttribute('hello', {name:'ContactSelector'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extSelectedContacts]);
  return (
    <Box h="100%" w="100%" ref={thisComponet}>
      <Heading size="sm" my="2">
        Contacts:
      </Heading>
      <Box display="flex" flexDirection="column" w="100%">
      <Skeleton isLoaded={!isLoading}>
        <AsyncSelect
          isMulti
          isLoading={isLoading}
          cacheOptions
          value={selectedContacts}
          loadOptions={promiseOptions}
          onChange={handleChange}
          defaultOptions={contactList}
          styles={customStyles}
        />
        </Skeleton>
      </Box>
    </Box>
  );
};
ContactSelector.propTypes = {
  extSelectedContacts: PropTypes.array,
  name:PropTypes.string,
};
ContactSelector.defaultProps = {
  extSelectedContacts: [],
  name:'ContactSelector'
};
export default ContactSelector;
