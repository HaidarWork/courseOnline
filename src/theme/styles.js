const styles = {
  global: (props) => ({
    // "*, *::before, &::after": {
    //   overFlowX: "hidden",
    // },
    html: {
      width: "100vw",
      overflowX: "hidden",
    },
    body: {
      bg: props.colorMode === "dark" ? "black.primary" : "white.primary",
      color: props.colorMode === "dark" ? "white.primary" : "black.primary",
    },
    a: {
      color: "blue.500",
      _hover: {
        textDecoration: "none",
      },
    },
    link: {
      color: "white.primary",
      _hover: {
        textDecoration: "underline",
      },
    },
  }),
};

export default styles;
