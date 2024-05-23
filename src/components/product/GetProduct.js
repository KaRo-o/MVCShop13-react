import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const GetProduct = () => {
  const { prodNo, role } = useParams();
  const [prod, setProd] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const axiosGetProduct = async () => {
    axios
      .get("http://192.168.0.45:8000/product/json/getProduct/" + prodNo)
      .then((res) => {
        console.log(res);
        setProd(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    axiosGetProduct();
  }, []);

  const goUpdate = () => {
    navigate("/updateProduct", { state: { prod } });
  };

  if (loading) {
    return (
      <Container>
        <br />
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
        <br />
        <Row>
          <Col className="text-Center">
            <h3>상품 상세정보</h3>
            <hr />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Image src={"/images/" + prod.fileName} thumbnail />
          </Col>
          <Col>
            <h3 className="text-center">{prod.prodName}</h3>
            <hr />
            <Table borderless>
              <tbody>
                <tr>
                  <td>상품상세정보</td>
                  <td>{prod.prodDetail}</td>
                </tr>
                <tr>
                  <td>제조일자</td>
                  <td>{prod.manuDate}</td>
                </tr>
                <tr>
                  <td>가격</td>
                  <td>{prod.price}</td>
                </tr>
                <tr>
                  <td>등록일자</td>
                  <td>{prod.regDate}</td>
                </tr>
              </tbody>
            </Table>
            {role === "manage" ? (
              <Button onClick={goUpdate}>상품정보수정</Button>
            ) : (
              <Button>구매하기</Button>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default GetProduct;
