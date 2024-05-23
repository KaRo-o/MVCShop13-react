import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const GetUser = () => {
  const cookies = new Cookies();
  console.log(cookies);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const userId = useParams();
  console.log(userId);
  const axiosGetUser = async () => {
    try {
      axios
        .get("http://192.168.0.45:8000/user/json/getUser/" + userId.id)
        .then((res) => {
          setUser(res.data);
          console.log(res);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    axiosGetUser();
  }, []);

  const navigate = useNavigate();

  const goUpdate = () => {
    navigate("/updateuser/" + user.userId, { state: { user } });
  };

  if (loading) {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  } else if (!loading) {
    return (
      <Container>
        <br />
        <Row>
          <Col></Col>
          <Col>
            <h3 className=" text-info">회원정보조회</h3>
            <h5 className="text-muted">
              내 정보를 <strong className="text-danger">최신정보로 관리</strong>
              해 주세요.
            </h5>
          </Col>
          <Col></Col>
        </Row>
        <br />
        <Row className="justify-content-md-center">
          <Col></Col>
          <Col xs={9} md={9}>
            <Row>
              <Col xs={4} md={2}>
                <strong>아 이 디</strong>
              </Col>
              <Col xs={8} md={4}>
                {user.userId}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={4} md={2}>
                <strong>이 름</strong>
              </Col>
              <Col xs={8} md={4}>
                {user.userName}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={4} md={2}>
                <strong>주소</strong>
              </Col>
              <Col xs={8} md={4}>
                {user.addr}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={4} md={2}>
                <strong>휴대전화번호</strong>
              </Col>
              <Col xs={8} md={4}>
                {user.phone}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={4} md={2}>
                <strong>이 메 일</strong>
              </Col>
              <Col xs={8} md={4}>
                {user.email}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={4} md={2}>
                <strong>가입일자</strong>
              </Col>
              <Col xs={8} md={4}>
                {user.regDate}
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md={12} className="text-center">
                <Button className="btn-primary" onClick={goUpdate}>
                  회원정보수정
                </Button>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
};

export default GetUser;
