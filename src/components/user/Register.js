import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [duplication, setDuplication] = useState(" ");
  const [inputId, setInputId] = useState(" ");
  const [inputPwd, setInputPwd] = useState(" ");
  const [inputCheckPwd, setInputCheckPwd] = useState(" ");
  const [checkPwdText, setCheckPwdText] = useState(" ");
  const [inputName, setInputName] = useState(" ");
  const [inputSsn, setInputSsn] = useState(" ");
  const [checkSsn, setcheckSsn] = useState(" ");
  const [inputAddr, setInputAddr] = useState(" ");
  const [inputTel, setInputTel] = useState(" ");
  const [tel1, setTel1] = useState("010");
  const [tel2, setTel2] = useState(" ");
  const [tel3, setTel3] = useState(" ");
  const [inputEmail, setInputEmail] = useState(" ");
  const [checkEmail, setCheckEmail] = useState(" ");
  const [validationWarning, setValidationWarning] = useState(" ");

  const navigate = useNavigate();

  //아이디 유효성 체크 및 아이디 입력정보 저장
  const handleInputId = (e) => {
    setInputId(e.target.value);
    console.log(inputId);
    console.log(inputId.length);
    if (inputId.length > 1) {
      checkDuplication(e.target.value);
    }
    if (inputId.length <= 4) {
      setDuplication("길이는 5글자 이상이어야 합니다.");
    }
  };

  //아이디 중복체크
  const checkDuplication = async (e) => {
    try {
      axios
        .get("http://192.168.0.45:8000/user/json/getUser/" + e)
        .then((res) => {
          console.log(res);
          if (!res.data && inputId.length >= 4) {
            setDuplication("사용가능한 Id 입니다");
          } else if (res.data && inputId.length >= 4) {
            setDuplication("존재하는 ID 입니다.");
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  //비밀번호 입력정보 얻어오기
  const handleGetPwd = (e) => {
    console.log("비밀번호 : " + e.target.value);
    setInputPwd(e.target.value);
  };

  //비밀번호 확인
  const handleCheckPwd = (e) => {
    console.log("비밀번호 확인 : " + e.target.value);
    setInputCheckPwd(e.target.value);
    if (e.target.value !== inputPwd) {
      setCheckPwdText("비밀번호가 일치하지 않습니다.");
    } else if (e.target.value === inputPwd) {
      setCheckPwdText("비밀번호가 일치합니다.");
    }
  };

  //이름 입력정보 저장
  const handleGetName = (e) => {
    console.log(e.target.value);
    setInputName(e.target.value);
  };

  //주민번호 입력정보 저장
  const handleGetSsn = (e) => {
    console.log(e.target.value);
    setInputSsn(e.target.value);
  };

  //주민번호 유효성 검사
  const ssnCheck = (inputSsn) => {
    let pattern = /^([0-9]{6})-?([0-9]{7})$/;
    let num = inputSsn;
    if (!pattern.test(num)) return false;
  };

  //주소 입력정보 저장
  const handleGetAddr = (e) => {
    console.log(e.target.value);
    setInputAddr(e.target.value);
  };

  //전화번호 첫번째 자리
  const handleGetTel1 = (e) => {
    console.log(e.target.value);
    setTel1(e.target.value);
    console.log(inputTel);
  };

  //전화번호 두번째 자리
  const handleGetTel2 = (e) => {
    console.log(e.target.value);
    setTel2(e.target.value);
    console.log(inputTel);
  };

  //전화번호 세번째 자리
  const handleGetTel3 = (e) => {
    console.log(e.target.value);
    setTel3(e.target.value);
    console.log(inputTel);
  };

  //이메일 유효성 검사
  const handleGetEmail = (e) => {
    setInputEmail(e.target.value);

    if (
      inputEmail !== "" &&
      (inputEmail.indexOf("@") < 1 || inputEmail.indexOf(".") === -1)
    ) {
      setCheckEmail("이메일 형식이 아닙니다.");
    } else {
      setCheckEmail("");
    }
  };

  //인코딩 문제 해결용 config
  const config = {
    headers: {
      "Content-type": "application/json; charset=EUC-KR",
    },
  };

  //회원가입 버튼 이벤트
  const addUser = () => {
    if (inputId === "" || duplication !== "사용가능한 Id 입니다") {
      setValidationWarning("아이디가 입력되지 않았거나 유효하지 않습니다.");
      return alert(validationWarning);
    }

    if (inputPwd === "" || inputPwd !== inputCheckPwd) {
      setValidationWarning(
        "비밀번호가 입력되지 않았거나 비밀번호 확인과 동일하지 않습니다."
      );
      return alert(validationWarning);
    }

    if (inputName === "") {
      setValidationWarning("이름이 입력되지 않았습니다.");
      return alert(validationWarning);
    }

    // if (inputAddr === "") {
    //   setValidationWarning("주소가 입력되지 않았습니다.");
    //   return alert(validationWarning);
    // }

    if (
      (inputEmail !== "" &&
        (inputEmail.indexOf("@") < 1 || inputEmail.indexOf(".") === -1)) ||
      inputEmail === ""
    ) {
      setValidationWarning("이메일이 올바르게 입력되지 않았습니다.");
      return alert(validationWarning);
    }

    try {
      axios
        .post(
          "http://192.168.0.45:8000/user/json/addUser",
          {
            userId: inputId,
            userName: inputName,
            password: inputPwd,
            ssn: inputSsn,
            phone1: tel1,
            phone2: tel2,
            phone3: tel3,
            addr: inputAddr,
            email: inputEmail,
          },
          config
        )
        .then(navigate("/login"));
    } catch {
      alert("회원가입 실패");
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col sm={11} md={8} lg={6}>
            <h2>회원가입</h2>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  아이디
                </Form.Label>
                <Col sm="5">
                  <Form.Control onChange={handleInputId} placeholder="아이디" />
                </Col>
                <Col sm="4">
                  <Form.Label>{duplication}</Form.Label>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  비밀번호
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="password"
                    placeholder="비밀번호"
                    onBlur={handleGetPwd}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  비밀번호확인
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={handleCheckPwd}
                  />
                  <strong>{checkPwdText}</strong>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  이름
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="이름"
                    onBlur={handleGetName}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  주민번호
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="주민번호"
                    onChange={handleGetSsn}
                  />
                  <strong className="text-danger">
                    "-" 제외 13자리를 입력하세요, {checkSsn}
                  </strong>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  주소
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="주소"
                    onBlur={handleGetAddr}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  휴대전화번호
                </Form.Label>
                <Col>
                  <Form.Select onChange={handleGetTel1}>
                    <option>010</option>
                    <option>011</option>
                    <option>016</option>
                    <option>018</option>
                    <option>019</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Control type="tel" onBlur={handleGetTel2} />
                </Col>
                <Col>
                  <Form.Control type="tel" onBlur={handleGetTel3} />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="3">
                  Email
                </Form.Label>
                <Col sm="9">
                  <Form.Control onChange={handleGetEmail} />
                  <strong>{checkEmail}</strong>
                </Col>
              </Form.Group>
              <Form.Group>
                <Col></Col>
                <Col className="text-center">
                  <Button onClick={addUser}>회원가입</Button>&nbsp;&nbsp;
                  <Button>취소</Button>
                </Col>
                <Col></Col>
              </Form.Group>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
