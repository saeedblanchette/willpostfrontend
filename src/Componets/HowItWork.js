import { Box, Circle, Flex, Heading, Center, Text } from '@chakra-ui/react';
import Container from './Container';
import {SITE_NAME} from '../constants'
const HowCardList = [
  {
    number: 1,
    paragraph: 'Create a  new massage in home page',
  },
  {
    number: 2,
    paragraph:
      `${SITE_NAME} will send you an email In order to check you are still alive. every 30 days ( by default but you can change it) `,
  },
  {
    number: 3,
    paragraph:
      "In case you didn't confirm your existence within 7 days. we will notify your safeguards ( if  case you select any)",
  },

  {
    number: 4,
    paragraph:
      'In case your  safeguards confirm that you are not alive. your Will will be sent to your selected contacts',
  },
];
const HowCard = ({ number, paragraph }) => {
  return (
    <Flex
      p="4"
      m="4"
      flex="1"
      flexBasis={['100%', '36%']}
      border="1px"
      borderColor="gray.200"
      boxShadow={'2xl'}
      rounded="md"
    >
      <Box>
        <Circle p="2" bgGradient="linear(#7FCAD2 0%, #31837F 25%, #868c94 50%)">
          <Circle p="4" backgroundColor="white">
            <Heading
              as="h1"
              bgGradient="linear(#7FCAD2 0%, #31837F 25%, #868c94 50%)"
              bgClip="text"
            >
              {number}
            </Heading>
          </Circle>
        </Circle>
      </Box>
      <Center p={[2, 4]}>
        <Text fontWeight="bold"> {paragraph} </Text>
      </Center>
    </Flex>
  );
};

export default function How() {
  return (
    <Box h="100vh">
      <Container>
        <Center>
          <Heading
            as="h1"
            my="16"
            fontSize={['2.3rem', '2.5rem', '2.5rem', '3rem']}
          >
            How It Works
          </Heading>
        </Center>
        <Flex my="5" flexWrap={['wrap', 'wrap', 'wrap']}>
          {HowCardList.map((elem, index) => (
            <HowCard
              key={index}
              number={elem.number}
              paragraph={elem.paragraph}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
