/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import SimplifyAccordionItem from './SimplifyAccordionItem';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,

  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from '@chakra-ui/react';
import { userService } from '../../services';
import Select from 'react-select';
const HELPERTEXTS = {
  '-1': 'No Safegrades is needed to confirm. ',
  1: 'At least one Safegrade is needed to confirm.   ',
  2: 'The majority of Safegrades is needed to confirm. ',
  3: 'All the Safegrades is needed to confirm. ',
};

const WillSettings = ({ title, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nonFieldErrors, setNonFieldErrors] = useState([]);
  const staleData = useRef({ vote_type: '' });
  const accitem = useRef();
  const service = userService();
  const [isEnabled, setIsEnabled] = useState(false);
  const [defualtValues, setDefualtValues] = useState({});
  const [isReadingMode, setIsReadingMode] = useState(true);
  const toast = useToast();
  const [options, setOptions] = useState([]);
  const [daysCount, setDaysCount] = useState(0);
  const [optHelperText, setOptHelperText] = useState('');
  const userRef = useRef();
  const {
    setError,
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const cancel = () => {
    reset({});
    setIsEnabled(false);
  };
  const handleSave = data => {
    const chengeData = {};

    // for (const key in data) {
    //   if (staleData.current[key] && staleData.current[key] !== data[key])
    //     chengeData[key] = data[key];
    // }
    // if (Object.entries(chengeData).length < 1) {
    // setIsReadingMode(true);
    //   return;
    // }
    const {
      number_of_dayes_before_notifying,
      vote_type: { value },
    } = data;
    service
      .update({ number_of_dayes_before_notifying, vote_type: value })
      .then(res => {
        setIsLoading(false);

        setDefualtValues(res.data);
        toast({
          title: 'Profile informations',
          description: 'Profile informations have been successfully updated ',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        // if (chengeData.email) {
        //   toast({
        //     title: 'Email activation',
        //     description:
        //       'An activation link has been sent to your new e-mail. Active it to be able to continue  ',
        //     status: 'info',
        //     duration: 9000,
        //     isClosable: true,
        //   });
        // }
        const { data } = res;
        staleData.current = {
          ...staleData.current,
          number_of_dayes_before_notifying:
            data.number_of_dayes_before_notifying,
          vote_type: data.vote_type,
        };
        setIsReadingMode(true);

        localStorage.setItem('user', JSON.stringify(res.data));
        preOptions(res.data.vote_type);
      })
      .catch(error => {
        setIsLoading(false);
        const { data, status } = error;
        setNonFieldErrors([]);
        if (status === 400) {
          handelErrors(data);
        }
      });
  };
  const handelCancel = () => {
    setIsReadingMode(true);
    reset(staleData.current);
  };
  const preOptions = defualtVoteType => {
    const { config } = JSON.parse(localStorage.getItem('user'));
    const vote_type = config.vote_type;
    const opts = [];
    for (const [key, value] of Object.entries(vote_type)) {
      const opt = { value: key, label: value.split('_').join(' ') };
      if (defualtVoteType === parseInt(key)) {
        setValue('vote_type', opt, { shouldValidate: true });
        staleData.current['vote_type'] = opt;
        setOptHelperText(HELPERTEXTS[key]);
      }
      opts.push(opt);
    }
    setOptions(opts);
  };
  const handelErrors = errors => {
    for (const key in errors) {
      if (key !== 'non_field_errors') {
        setError(key, {
          type: 'focus',
          message: errors[key][0],
        });
      } else {
        setNonFieldErrors(prev => prev.concat(errors[key]));
      }
    }
  };

  const handleChangePassword = data => {
    service
      .changePassword(data)
      .then(res => {
        toast({
          title: ' Password updated',
          description: 'Your password have been successfully updated ',
          status: 'success',
          duration: 8000,
          isClosable: true,
        });
        setIsLoading(false);
        reset({});
        setIsEnabled(false);
      })
      .catch(error => {
        setIsLoading(false);
        const { data, status } = error.response;
        if (status === 400) {
          setNonFieldErrors([]);
          handelErrors(data);
        }
      });
  };
  const handleDaysCountChange = value => {};
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    userRef.current = user;
    setValue(
      'number_of_dayes_before_notifying',
      user.number_of_dayes_before_notifying,
      { shouldValidate: true }
    );

    preOptions(user.vote_type);
    staleData.current['number_of_dayes_before_notifying'] =
      user.number_of_dayes_before_notifying;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handelTypeChange = (newValue, filed) => {
    filed.onChange(newValue);
    setOptHelperText(HELPERTEXTS[newValue.value]);
  };
  return (
    <SimplifyAccordionItem title={title} {...rest} ref={accitem} id="accitem">
      <Box w="100%" h="100%" position="relative">
        <form>
          <FormControl mb="2">
            <FormLabel>
              Number of dayes Before sending a confirmation
            </FormLabel>
            <Controller
              name="number_of_dayes_before_notifying"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Slider
                  flex="1"
                  focusThumbOnChange={false}
                  max={40}
                  isReadOnly={isReadingMode}
                  isDisabled={isReadingMode}
                  {...field}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                    fontSize="sm"
                    boxSize="32px"
                    children={getValues('number_of_dayes_before_notifying')}
                  />
                </Slider>
              )}
            />
            <FormHelperText>
              <Text fontSize="16px" color="black">
              the Confirmation is an email that will be sent to check  your exists
              </Text>
            </FormHelperText>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl mb="2">
            <FormLabel>Vote Type</FormLabel>
            <Controller
              name="vote_type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  defaultValue={options[0]}
                  options={options}
                  isDisabled={isReadingMode}
                  isReadOnly={isReadingMode}
                  onChange={newValue => handelTypeChange(newValue, field)}
                />
              )}
            />
            <FormHelperText>
              <Text fontSize="16px" color="black">
                {optHelperText}
             
              </Text>
            </FormHelperText>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <Box mt="4" display="flex" justifyContent="end">
            {isReadingMode ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  mx="2"
                  onClick={() => setIsReadingMode(false)}
                >
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  mx="2"
                  onClick={handleSubmit(handleSave)}
                  isLoading={isLoading}
                >
                  Save
                </Button>
                <Button mx="2" onClick={handelCancel}>
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </form>
      </Box>
    </SimplifyAccordionItem>
  );
};

export default WillSettings;
