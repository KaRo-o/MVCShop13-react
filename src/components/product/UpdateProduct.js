import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputManuDate, setManuDate] = useState();
  const [inputProdName, setProdName] = useState();
  const [inputProdDetail, setProdDetail] = useState();
  const [inputPrice, setPrice] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const [prod, setProd] = useState(location.state.prod);
  console.log(prod);

  const prodNo = location.state.prod.prodNo;

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const getManuDate = (e) => {
    setManuDate(selectedDate);
  };

  const getProdName = (e) => {
    setProdName(e.target.value);
  };

  const getProdDetail = (e) => {
    setProdDetail(e.target.value);
  };

  const getPrice = (e) => {
    setPrice(e.target.value);
  };

  //인코딩 문제 해결용 config
  const config = {
    headers: {
      "Content-type": "application/json; charset=EUC-KR",
    },
  };

  const updateProd = () => {
    try {
      axios
        .post(
          "http://192.168.0.45:8000/product/json/updateProduct",
          {
            prodNo: prodNo,
            prodName: inputProdName,
            prodDetail: inputProdDetail,
            manuDate: inputManuDate,
            price: inputPrice,
          },
          config
        )
        .then(navigate("/listproduct/manage"));
    } catch (error) {
      alert("상품정보 업데이트 실패...");
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col sm={11} md={8} lg={6} className="text-center">
            <h3>상품정보수정</h3>
            <hr />

            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  <strong>상품명</strong>
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    defaultValue={prod.prodName}
                    onBlur={getProdName}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  <strong>상품상세정보</strong>
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    defaultValue={prod.prodDetail}
                    onBlur={getProdDetail}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  <strong>제조일자</strong>
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    readOnly
                    placeholder="이곳을 클릭하여 날짜를 선택하세요"
                    onClick={() => setShowCalendar(true)}
                    value={selectedDate.toLocaleDateString()}
                    onChange={getManuDate}
                  />
                  {showCalendar && (
                    <Calendar
                      onChange={handleDateChange}
                      value={selectedDate}
                    />
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">
                  <strong>가격</strong>
                </Form.Label>
                <Col sm="9">
                  <Form.Control defaultValue={prod.price} onBlur={getPrice} />
                </Col>
              </Form.Group>
            </Form>
            <Form.Group>
              <br />
              <Col></Col>
              <Col className="text-center">
                <Button onClick={updateProd}>업데이트</Button>&nbsp;&nbsp;
                <Button onClick={() => navigate(-1)}>취소</Button>
              </Col>
              <Col></Col>
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateProduct;
