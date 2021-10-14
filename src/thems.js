import { extendTheme } from '@chakra-ui/react';

const Card = {
  // The styles all Cards have in common
  baseStyle: {
    // display: "flex",
    // flexDirection: "column",
    background: "white",
    alignItems: "center",
    gap: 6,
  },
  // Two variants: rounded and smooth
  variants: {
    rounded: {
      padding: 8,
      borderRadius: "xl",
      boxShadow: "xl",
    },
    smooth: {
      padding: 6,
      borderRadius: "base",
      boxShadow: "md",
    },
  },
  // The default variant value
  defaultProps: {
    variant: "smooth",
  },
}

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    focusBorderColor: 'black',
  },
  components: {
    Card,
    Input: {
      border: 'red',
      variants: {
        outline: props => ({
          _focus: {
            borderColor: 'black',
          },
        }),
      },
      defaultProps: {
        focusBorderColor: 'black',
        border: 'red',
      },
    },

    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },

      // 3. We can add a new visual variant
      variants: {
        // 4. We can override existing variants
        solid: props => ({
          bg: props.colorMode === 'dark' ? 'White' : 'Black',
          color: props.colorMode === 'dark' ? 'Black' : 'White',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.100' : 'gray.600',
          },
        }),
        outline: props => ({
          bg: props.colorMode === 'dark' ? 'gray.800' : 'White',
          color: props.colorMode === 'dark' ? 'White' : 'Black',
          borderColor: 'black',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.50',
          },
        }),
      },
    },
  },
});
export default theme;
