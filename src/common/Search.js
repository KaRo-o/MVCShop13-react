import React from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";

const Search = (props) => {
  const selectList = props.SearchConditionValue;

  const handleSearchKeyword = (e) => {
    props.getSearchKeyWord(e.target.value);
  };

  const handleSearchCondition = (e) => {
    console.log("search" + e.target.value);
    props.getSearchCondition(e.target.value);
  };

  return (
    <div>
      <Container>
        <Row className="mb-3">
          <Col>
            전체 {props.resultPage.totalCount}건수 , 현재
            {props.resultPage.currentPage}페이지
          </Col>
          <Col md="auto">
            <Form.Select onChange={handleSearchCondition}>
              {selectList.map((attr, index) => (
                <option value={index + 1}>{selectList[index]}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md="auto">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="검색어"
                onChange={handleSearchKeyword}
                onBlur={handleSearchKeyword}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={props.axiosUserList}
              >
                검색
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <br />
      </Container>
    </div>
  );
};

export default Search;
