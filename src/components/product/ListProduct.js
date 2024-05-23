import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import Search from "../../common/Search";
import { useNavigate, useParams } from "react-router-dom";

const ListProduct = () => {
  const [loading, setLoading] = useState(true);
  const [resultPage, setResultPage] = useState();
  let curPage = 1;
  const [res, setRes] = useState([]);
  const [searchCondition, setSearchCondition] = useState(1);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const SearchConditionValue = ["회원ID", "회원명"];
  const { role } = useParams();

  const navigate = useNavigate();

  const getSearchCondition = (condition) => {
    setSearchCondition(condition);
  };

  const getSearchKeyWord = (keyword) => {
    setSearchKeyWord(keyword);
  };

  const config = { "Content-Type": "application/json" };

  const scroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    console.log(window.innerHeight + scrollTop);
    console.log(offsetHeight);
    if (window.innerHeight + scrollTop >= offsetHeight || !scrollTop) {
      curPage += 1;
      console.log("화면끝 도달");
      scrollProductList();
    }
  };

  const axiosProductList = async () => {
    setResultPage();
    const body = {
      currentPage: curPage,
      searchCondition: searchCondition,
      searchKeyword: searchKeyWord,
    };
    console.log(body);
    try {
      const response = await axios
        .post("http://192.168.0.45:8000/product/json/listProduct", body, config)
        .then((res) => {
          console.log(res);
          const newData = res.data.product;
          setRes((prevData) => [...prevData, ...newData]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    axiosProductList(curPage).then(() => {
      setLoading(false);
    });
  }, []);

  const scrollProductList = async () => {
    setResultPage();
    const body = {
      currentPage: curPage,
      searchCondition: searchCondition,
      searchKeyword: searchKeyWord,
    };
    try {
      const response = await axios
        .post("http://192.168.0.45:8000/product/json/listProduct", body, config)
        .then((res) => {
          console.log(res);
          const newData = res.data.product;
          setRes((prevData) => [...prevData, ...newData]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scroll);
  }, []);

  const getprod = (e, role) => {
    console.log(e, role);
    navigate("/getproduct/" + e + "/" + role);
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
        <Row>
          {role === "manage" && <h2>상품 관리</h2>}
          {role === "search" && <h2>상품 목록</h2>}

          <hr />
          {resultPage && (
            <Search
              resultPage={resultPage}
              SearchConditionValue={SearchConditionValue}
              getSearchCondition={getSearchCondition}
              getSearchKeyWord={getSearchKeyWord}
              axiosUserList={axiosProductList}
            />
          )}
        </Row>
        <Row>
          {res.map((map, index) => (
            <Col key={index}>
              <Card border="warning" style={{ width: "18rem" }}>
                <Carousel>
                  <Card.Img variant="top" src={"/images/" + map.fileName} />
                  {map.proTranCode !== "1" && (
                    <Carousel.Caption>
                      <h3
                        style={{
                          backgroundColor: "rgba(255, 255, 0, 0.66)",
                        }}
                      >
                        판매 완료
                      </h3>
                    </Carousel.Caption>
                  )}
                </Carousel>
                <Card.Body>
                  <Card.Title>{map.prodName}</Card.Title>
                  <Card.Text>{map.prodDetail}</Card.Text>
                  {role === "manage" ? (
                    <Button
                      variant="primary"
                      onClick={(e, role) => {
                        getprod(map.prodNo, "manage");
                      }}
                    >
                      상품상세정보
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={(e, role) => {
                        getprod(map.prodNo, "search");
                      }}
                    >
                      상품상세정보
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
};

export default ListProduct;
