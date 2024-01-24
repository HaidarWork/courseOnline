import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../data";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";

import readPDF from "../assets/readM.pdf";
import { HiMiniMinus } from "react-icons/hi2";
import { MdOutlineAdd } from "react-icons/md";
import ReactPlayer from "react-player";

export default function CoursePage() {
  // const history = useHistory();
  const [user, setUser] = useState([]);
  const videoRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const [vidState, setVidState] = useState([
    { id: 0, state: false },
    { id: 1, state: true },
    { id: 2, state: true },
    { id: 3, state: true },
    { id: 4, state: true },
    { id: 5, state: true },
    { id: 6, state: true },
    { id: 7, state: true },
    { id: 8, state: true },
    { id: 9, state: true },
    { id: 10, state: true },
    { id: 11, state: true },
    { id: 12, state: true },
    { id: 13, state: true },
  ]);
  const { course } = data;
  const navigate = useNavigate();
  const { questions } = data;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleClick = () => {
    const status = true;
    localStorage.setItem("status", JSON.stringify(status));
    navigate("/home/course/quiz", { state: questions });
  };

  return (
    <Box
      w={"90vw"}
      boxShadow={"0px 0px 2px 0px #959292b8"}
      m={"2rem 2rem"}
      borderRadius={"2%"}
      p={"2rem"}
    >
      {/* Title and Description */}
      <Box pt={8}>
        <Heading
          as="h1"
          size="lg"
          textAlign={"center"}
          color={"#0a0235"}
          p={"2rem"}
        >
          {course.title}
        </Heading>
        <Text mt={4} color={"#484848"} fontWeight={"600"} pb={"4rem"}>
          {course.description}
        </Text>
      </Box>

      <Box>
        <Accordion allowMultiple>
          {course.stages.map((stage) => (
            <AccordionItem
              key={stage.stage_id}
              isDisabled={vidState.find((el) => el.id === stage.stage_id).state}
              // isDisabled={vidState[2].state}
              onClick={() => console.log(vidState[stage.stage_id].state)}
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {stage.title}
                      </Box>
                      {isExpanded ? (
                        <HiMiniMinus fontSize="12px" />
                      ) : (
                        <MdOutlineAdd fontSize="12px" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <ReactPlayer
                      config={{
                        file: { attributes: { controlsList: "nodownload" } },
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                      url={stage.videoUrl}
                      controls
                      loop={false}
                      width="100%"
                      height="auto"
                      ref={videoRef}
                      onEnded={() => {
                        if (stage.stage_id === 13) {
                          setDisabled(false);
                        }

                        setVidState(
                          vidState.filter(
                            (prev) => prev.id !== stage.stage_id + 1
                          )
                        );
                        setVidState((prev) => [
                          ...prev,
                          {
                            id: stage.stage_id + 1,
                            state: false,
                          },
                        ]);
                      }}
                      onProgress={() => {
                        videoRef.current.getCurrentTime() >= played &&
                          setPlayed(videoRef.current.getCurrentTime());
                      }}
                      onSeek={() => {
                        videoRef.current.getCurrentTime() > played &&
                          videoRef.current.seekTo(played);
                      }}
                    />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
      <Button
        className="btnBuyNow"
        mt={"4rem"}
        mr={"4rem"}
        isDisabled={disabled}
      >
        <a href={readPDF} target="_blank" rel="noopener noreferrer">
          مادة للقراءة
        </a>
      </Button>

      <Button
        className="btnBuyNow"
        onClick={handleClick}
        mt={"4rem"}
        isDisabled={disabled}
      >
        ابدأ الامتحان
      </Button>
    </Box>
  );
}
