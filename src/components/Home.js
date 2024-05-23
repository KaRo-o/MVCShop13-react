import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Cookies } from "react-cookie";

const Home = () => {
  const cookies = new Cookies();
  cookies.get("logon");
  //console.log(cookies);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState();

  const axiosCarouSel = async () => {
    axios
      .get("http://192.168.0.45:8000/product/json/carouselProduct")
      .then((res) => {
        setNewProduct(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    axiosCarouSel();
  }, []);

  console.log(newProduct);

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
          <h2>최근 등록된 상품</h2>
          <hr />
          <Col></Col>
          <Col xs={9} md={9}>
            <Carousel
              data-bs-theme="dark"
              indicators={false}
              style={{ border: "1px solid gray" }}
            >
              {newProduct.product.map((map, index) => (
                <Carousel.Item key={index} className="text-center">
                  <Image
                    src={"/images/" + map.fileName}
                    width="auto"
                    height="300px"
                  />
                  <h3 className="text-center">{map.prodName}</h3>
                  <p className="text-center">{map.prodDetail}</p>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
};

export default Home;
