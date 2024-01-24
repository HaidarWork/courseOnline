const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: "semibold",
    borderRadius: "base", // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
    lg: {
      height: "45px",
      width: "180px",
    },
  },
  // Two variants: outline and solid
  variants: {
    primary: (props) => ({
      border: "2px solid",
      bg: props.colorMode === "dark" ? "yellow.primary" : "blue.primary",
      color: props.colorMode === "dark" ? "black" : "white",
      borderRadius: "lg",
      _hover: {
        bg: props.colorMode === "dark" ? "yellow.hover" : "blue.hover",
        _disabled: {
          bg: "blue.700",
        },
      },
    }),
    secondary: {
      border: "1px solid",
      bg: "gray.100",
      borderColor: "gray.300",
      color: "black.50",
      _disabled: {
        _hover: {
          bg: "blue.700",
        },
      },
      _hover: {
        bg: "gray.200",
      },
    },
    custom: {
      border: "1px solid",
      bg: "yellow",
      color: "black",
      borderColor: "black",
      width: "190px",
      height: "35px",
      _hover: {
        bg: "yellow.50",
      },
      _disabled: {
        bg: "gray.50",
        _hover: {
          bg: "gray.50",
        },
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "lg",
    variant: "primary",
  },
};

export default Button;
