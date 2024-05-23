import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const UpdateUser = () => {
  const location = useLocation();

  const [user, setUser] = useState(location.state?.user);

  console.log(user);
  return (
    <Container>
      <br />
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col sm={11} md={8} lg={6} className="text-center">
          <h3 className="text-info">회원정보수정</h3>
          <h5 className="text-muted">
            내 정보를 <strong className="text-danger">최신정보로 관리</strong>해
            주세요.
          </h5>
          <hr />
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              아이디
            </Form.Label>
            <Col sm="9">
              <Form.Control defaultValue={user.userId} readOnly />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              비밀번호
            </Form.Label>
            <Col sm="9">
              <Form.Control type="password" placeholder="변경할 비밀번호" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              비밀번호 확인
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="변경할 비밀번호 확인"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              이름
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" defaultValue={user.userName} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              주소
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" defaultValue={user.addr} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              휴대전화번호
            </Form.Label>
            <Col>
              <Form.Select>
                <option>010</option>
                <option>011</option>
                <option>016</option>
                <option>018</option>
                <option>019</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Control type="tel" />
            </Col>
            <Col>
              <Form.Control type="tel" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control defaultValue={user.email} />
            </Col>
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
      <br />
    </Container>
  );
};

export default UpdateUser;
