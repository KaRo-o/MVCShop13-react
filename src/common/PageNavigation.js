import React, { useEffect, useState } from "react";
import { Pagination, Container, Row, Col } from "react-bootstrap";

const PageNavigation = (props) => {
  console.log(props);
  const currentPage = props.resultPage.currentPage;
  const beginUnitPage = props.resultPage.beginUnitPage;
  const endUnitPage = props.resultPage.endUnitPage;
  const [paginationItems, setPaginationItems] = useState([]);

  useEffect(() => {
    const generatePaginationItems = () => {
      const items = [];
      for (let i = beginUnitPage; i <= endUnitPage; i++) {
        if (i > 0) {
          items.push(
            <Pagination.Item key={i} onClick={() => handlePageClick(i)}>
              {i}
            </Pagination.Item>
          );
        }
      }
      setPaginationItems(items);
    };

    generatePaginationItems();
  }, [currentPage]);

  const handlePageClick = (pageNum) => {
    props.getCurPage(pageNum); // 부모 컴포넌트의 페이지 번호 업데이트 함수 호출
  };
  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              {paginationItems}
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageNavigation;
