import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const Login = () => {
  const [inputId, setInputId] = useState("");
  const [inputPasswd, setInputPasswd] = useState("");

  let navigate = useNavigate();

  const cancelLogin = () => {
    navigate("/");
  };

  const goRegister = () => {
    navigate("/register");
  };

  const handleInputId = (e) => {
    setInputId(e.target.value);
    //console.log(inputId);
  };

  const handleInputPasswd = (e) => {
    setInputPasswd(e.target.value);
    //console.log(inputPasswd);
  };

  const cookies = new Cookies();
  //console.log(cookies);

  const loginPost = async (e) => {
    console.log("login axiox Post");
    console.log(inputId + " : " + inputPasswd);

    axios
      .post("http://192.168.0.45:8000/user/json/login", {
        userId: inputId,
        password: inputPasswd,
      })
      .then((res) => {
        console.log(res);
        if (res.data.active === true) {
          cookies.set("logon", res.data);
          navigate("/");
        } else if (res.data.active === false || res.data === "") {
          alert("아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다.");
        }
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <h2>로그인</h2>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>

          <Col xs={6}>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={3}>
                  아&nbsp;이&nbsp;디
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="userId"
                    name="userId"
                    placeholder="ID"
                    onChange={handleInputId}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalPassword"
              >
                <Form.Label column sm={3}>
                  패스워드
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputPasswd}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalCheck"
              ></Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm={3}></Col>
                <Col xs="auto">
                  <Button onClick={loginPost} className="mb-2">
                    로그인
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button onClick={cancelLogin} className="mb-2">
                    취소
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button onClick={goRegister} className="mb-2">
                    회원가입
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
