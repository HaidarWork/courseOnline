import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import hr from "../assets/img/hr.jpg";
import { data } from "../data";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

export default function HomePage() {
  const [isLargerThan62] = useMediaQuery("(min-width: 62em)");
  const [user, setUser] = useState([]);
  const { course } = data;
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleClick = () => {
    navigate("/home/course");
  };

  return (
    <Flex
      boxShadow={"0px 0px 1px 1px #d7d4d4b0"}
      alignItems="center"
      w="80vw"
      px={isLargerThan62 ? "16" : "6"}
      background={"#f9f9f947"}
      m={"40px 8px"}
      borderRadius={"3%"}
      py="16"
      h="min-content"
      justifyContent="space-between"
      flexDirection={"column"}
    >
      <Flex justifyContent="space-between" w="70vw">
        <Box>
          <Text
            padding={"1rem 0rem"}
            fontWeight={"800"}
            fontSize={"5xl"}
            textShadow={"1px 0px 2px #020e3b"}
            color={"#021729"}
          >
            منصة التدريب الذاتي
          </Text>
        </Box>
        <Box>
          <Image src={logo} alt="logo" w={"140px"} />
        </Box>
      </Flex>

      <Flex pt={"5rem"}>
        <Box
          mr={isLargerThan62 ? "6" : "0"}
          w={isLargerThan62 ? "55%" : "full"}
          display={"flex"}
          flexDir={"column"}
          gap={"35px"}
        >
          <Text
            fontSize={isLargerThan62 ? "2xl" : "3xl"}
            fontWeight="bold"
            mb="4"
          >
            {course.title}
          </Text>

          <Text mb="6" fontSize={isLargerThan62 ? "lg" : "base"} opacity={0.7}>
            {course.description}
          </Text>

          <Button
            w="200px"
            colorScheme="blue"
            variant="solid"
            h="50px"
            size={isLargerThan62 ? "lg" : "md"}
            mb={isLargerThan62 ? "0" : "10"}
            onClick={handleClick}
          >
            ابدأ الدروس
          </Button>
        </Box>

        <Spacer />

        <Flex
          w={isLargerThan62 ? "40%" : "full"}
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={hr}
            alt="hr course"
            boxShadow={"0px 0px 3px 1px #d5c7c7ad"}
            borderRadius={"3%"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
