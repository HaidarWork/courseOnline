import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Exam from "../component/Exam";
import { Image } from "@chakra-ui/react";
import logo from "../assets/img/logo.png";

export default function QuizPage() {
  const { state } = useLocation();
  const questions = state;
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const status = JSON.parse(localStorage.getItem("status"));

    if (user && status) {
      setUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="logo">
            <Image src={logo} alt="logo" />
          </div>
          <div>
            <p className="user">{user.username}</p>
          </div>
          <div className="sectionSearch">
            <div className="searchBox">
              <p>امتحان الإداري المعتمد في الموارد البشرية</p>
            </div>
          </div>
        </div>
        <Exam questions={questions} />
      </div>
    </main>
  );
}
