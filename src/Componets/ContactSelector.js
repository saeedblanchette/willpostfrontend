import { Box, Heading } from '@chakra-ui/react';
import React, { ReactDOM,useEffect, useState } from 'react';
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
      const node = ReactDOM.findDOMNode(this);
      node.setAttribute('type', {name:'ContactSelector'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extSelectedContacts]);
  return (
    <Box h="100%" w="100%">
      <Heading size="sm" my="2">
        Contacts:
      </Heading>
      <Box display="flex" flexDirection="column" w="100%">
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
      </Box>
    </Box>
  );
};
ContactSelector.propTypes = {
  extSelectedContacts: PropTypes.array,
};
ContactSelector.defaultProps = {
  extSelectedContacts: [],
};
export default ContactSelector;
