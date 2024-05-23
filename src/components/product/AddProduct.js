import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment"; // Moment.js 임포트
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [imageList, setImageList] = useState([]);
  const [inputProdName, setProdName] = useState();
  const [inputProdDetail, setProdDetail] = useState();
  const [inputManuDate, setManuDate] = useState();
  const [inputPrice, setPrice] = useState();

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const onChangeImageInput = (e) => {
    setImageList([...imageList, ...e.target.files]);
  };

  const getProdName = (e) => {
    let encodeProdname = encodeURIComponent(e.target.value);
    setProdName(encodeProdname);
  };

  const getProdDetail = (e) => {
    let encodeProdDetail = encodeURIComponent(e.target.value);
    setProdDetail(encodeProdDetail);
  };

  const getPrice = (e) => {
    setPrice(e.target.value);
  };

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const getManuDate = (e) => {
    setManuDate(selectedDate);
  };

  const config = {
    headers: {
      "Content-type": "multipart/form-data; charset=EUC-KR",
    },
  };

  const add = async () => {
    console.log(
      inputProdName,
      inputProdDetail,
      inputPrice,
      selectedDate,
      imageList
    );

    const contentsData = {
      prodName: inputProdName,
      prodDetail: inputProdDetail,
      price: inputPrice,
      manuDate: selectedDate,
    };

    const formData = new FormData();

    imageList.forEach((image) => {
      console.log(image);
      formData.append("files", image);
    });

    formData.append("prodName", inputProdName);
    formData.append("prodDetail", inputProdDetail);
    formData.append("manuDate", selectedDate);
    formData.append("price", inputPrice);

    //"http://192.168.0.45:8000/product/json/addProduct"
    try {
      // axios를 이용한 post 요청. 헤더를 multipart/form-data 로 한다.
      await axios.post(
        // "http://localhost:8000/product/json/addProduct"
        "http://192.168.0.45:8000/product/json/addProduct",
        formData,
        config
      );
      alert("상품이 등록되었습니다");
      navigate("/");
    } catch (err) {
      alert(err || "게시글 등록에 실패했습니다");
    }
  };

  return (
    <Container>
      <br />
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col sm={11} md={8} lg={6} className="text-center">
          <h3>상품등록</h3>
          <hr />

          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <strong>상품명</strong>
              </Form.Label>
              <Col sm="9">
                <Form.Control placeholder="상품명" onBlur={getProdName} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <strong>상품상세정보</strong>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  placeholder="상품상세정보"
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
                  <Calendar onChange={handleDateChange} value={selectedDate} />
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                <strong>가격</strong>
              </Form.Label>
              <Col sm="9">
                <Form.Control placeholder="가격" onBlur={getPrice} />
              </Col>
            </Form.Group>
          </Form>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/gif"
            multiple
            onChange={onChangeImageInput}
          />
          <Form.Group>
            <br />
            <Col></Col>
            <Col className="text-center">
              <Button onClick={add}>등록</Button>&nbsp;&nbsp;
              <Button>취소</Button>
            </Col>
            <Col></Col>
          </Form.Group>
        </Col>

        <Col></Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
