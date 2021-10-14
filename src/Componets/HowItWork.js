import { Box, Circle, Flex, Heading, Center, Text } from '@chakra-ui/react';
import Container from './Container';

const HowCardList = [
  {
    number: 1,
    paragraph: 'Create a  new massage',
  },
  {
    number: 2,
    paragraph:
      'The willposter it will keep sending  you an email every 30 days ( by default but you can change it)  In oreder to chack still alive',
  },
  {
    number: 3,
    paragraph:
      'In case we didn’t  get recipone from you after 30 days we iwill notify your sefe gared ( if you select seafe gardes)',
  },

  {
    number: 4,
    paragraph:
      'In case your safe gared confirem  that you are not  alive your will will be sent to your selected contact',
  },
];
const HowCard = ({ number, paragraph }) => {
  return (
    <Flex
      boxShadow="xl"
      p="4"
      rounded="md"
      m="4"
      flex="1"
      flexBasis={['100%', '36%']}
      border="1px"
      borderColor="gray.200"
    >
      <Box>
        <Circle border="8px" borderColor="Black" p="4">
          <Heading as="h1">{number}</Heading>
        </Circle>
      </Box>
      <Center p={[2, 4]}>
        {' '}
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
