import { Box, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
const titledParagraphlist = [
  {
    title: 'Secure ',
    paragraph:
      'Reprehenderit esse labore id veniam ut veniam non ex adipisicing amet ullamco dolor proident. Exercitation velit ea',
  },
  {
    title: 'Simple ',
    paragraph:
      'Reprehenderit esse labore id veniam ut veniam non ex adipisicing amet ullamco dolor proident. Exercitation velit ea',
  },

  {
    title: ' Support for Video and audio ',
    paragraph:
      'Reprehenderit esse labore id veniam ut veniam non ex adipisicing amet ullamco dolor proident. Exercitation velit ea',
  },
];
const TitledParagraph =  ({title, paragraph})=> {
  return (
    <Box
      bgGradient="linear(#7FCAD2 0%, #31837F 25%, #868c94 50%)"
      mt="3"
      boxShadow={'2xl'}
      rounded="md"
    >
      <Box backgroundColor="white" height="100%" m="1">
        <Box py="5" key={title} p="6" my="6" backgroundColor="white">
          <Box>
            <Heading as="h1" my="5" fontSize={['2rem', '2rem']}>
              {title}
            </Heading>
            <Text
              w={['100%', '100%', '50%']}
              fontWeight="bold"
              fontSize={['0.9rem']}
              color="gray.600"
            >
              {paragraph}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default function Features() {
  return (
    <Box px={['3', '5', '10', '28']} mb="24">
      <Box my={['20', '28']}>
        {/* <Center> */}
        <VStack>
          <Heading as="h1" my="6" fontSize={['2.4rem', '4.5rem']} size="4xl">
            It is Never too late
          </Heading>
          <Text
            w={['100%', '100%', '50%']}
            fontWeight="bold"
            color="gray.600"
            size="2xl"
          >
            Reprehenderit esse labore id veniam ut veniam non ex adipisicing
            amet ullamco dolor proident. Exercitation velit ea incididunt sit
            qui do ipsum fugiat laboris minim nostrud dolor
          </Text>
        </VStack>
        {/* </Center> */}
      </Box>
      <Box>
        <Flex flexDirection={['column-reverse', 'column-reverse', 'row']}>
          <Box w={['100%', '100%', '50%']} px={['2', '3', '10']}>
            {titledParagraphlist.map((elem, index) => 
              <TitledParagraph
                title={elem.title}
                paragraph={elem.paragraph}
                key={index}
              />
            )}
          </Box>
          <Box
            w={['100%', '100%', '50%']}
            h="full"
            py="10"
            backgroundSize="contain"
            bgPosition="bottom"
            bgRepeat="no-repeat"
          >
            <Image src="/images/featuresBg.png" alt="Segun Adebayo" />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
