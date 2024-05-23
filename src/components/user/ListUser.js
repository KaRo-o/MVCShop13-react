import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Badge,
  Button,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { Cookies } from "react-cookie";
import PageNavigation from "../../common/PageNavigation";
import Search from "../../common/Search";

const ListUser = () => {
  const cookies = new Cookies();
  const [logonId, setLogonId] = useState(cookies.get("logon").userId);
  const [length, setLength] = useState();
  const [curPage, setCurPage] = useState(1);
  const [res, setRes] = useState([]);
  const [resultPage, setResultPage] = useState();
  const [showSimpleData, setShowSimpleData] = useState({}); // 간략정보를 보여줄지 여부를 저장하는 객체
  const SearchConditionValue = ["회원ID", "회원명"];

  //검색 조건
  const [searchCondition, setSearchCondition] = useState(1);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const config = { "Content-Type": "application/json" };

  const [loading, setLoading] = useState(true);

  const getCurPage = (num) => {
    setCurPage(num);
  };

  const getSearchCondition = (condition) => {
    setSearchCondition(condition);
  };

  const getSearchKeyWord = (keyword) => {
    setSearchKeyWord(keyword);
  };

  //페이지 로딩후 최초로 보여줄 리스트 정보 + 검색
  const axiosUserList = async () => {
    setResultPage();
    const body = {
      userId: logonId,
      currentPage: curPage,
      searchCondition: searchCondition,
      searchKeyword: searchKeyWord,
    };
    console.log(body);
    try {
      const response = await axios
        .post("http://192.168.0.45:8000/user/json/listuser", body, config)
        .then((response) => {
          setLength(response.data.list.length);
          setRes(response.data.list);
          setResultPage(response.data.resultPage);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    axiosUserList().then(() => {
      setLoading(false);
    });
  }, [curPage]);

  //유저 간략정보 보여줄 정보
  const axiosGetUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://192.168.0.45:8000/user/json/getUser/${userId}`
      );
      return response.data; // 유저 정보 반환
    } catch (e) {
      console.log(e);
    }
  };

  const toggleSimpleData = async (userId) => {
    if (!showSimpleData[userId]) {
      // 간략정보를 보여줄 필요가 있는 경우
      const userData = await axiosGetUser(userId);

      if (userData) {
        setShowSimpleData({ ...showSimpleData, [userId]: userData });
      }
    } else {
      // 간략정보를 숨길 경우
      const { [userId]: omit, ...rest } = showSimpleData;
      setShowSimpleData(rest);
    }
  };

  const hideSimpleData = (userId) => {
    const { [userId]: omit, ...rest } = showSimpleData;
    setShowSimpleData(rest);
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
        <Row>
          <h2>회원 목록 조회</h2>
          <hr />
          {resultPage && (
            <Search
              resultPage={resultPage}
              SearchConditionValue={SearchConditionValue}
              getSearchCondition={getSearchCondition}
              getSearchKeyWord={getSearchKeyWord}
              axiosUserList={axiosUserList}
            />
          )}
        </Row>
        <Row>
          <Col xs={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>회원 ID</th>
                  <th>회원명</th>
                  <th>이메일</th>
                  <th>간략정보</th>
                </tr>
              </thead>
              <tbody>
                {res.map((mapuser, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a href={`getuser/${mapuser.userId}`}>{mapuser.userId}</a>
                    </td>
                    <td>{mapuser.userName}</td>
                    <td>{mapuser.email}</td>
                    <td>
                      {showSimpleData[mapuser.userId] ? (
                        <div>
                          <h6>
                            아이디 : {mapuser.userId}
                            <br />이 름 : {mapuser.userName}
                            <br />
                            이메일 : {mapuser.email}
                            <br />
                            ROLE : {mapuser.role}
                            <br />
                            등록일 : {mapuser.regDate}
                            <br />
                          </h6>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => hideSimpleData(mapuser.userId)}
                          >
                            간략정보 숨기기
                          </Button>
                        </div>
                      ) : (
                        <Badge
                          bg="info"
                          onClick={() => toggleSimpleData(mapuser.userId)}
                        >
                          간략정보
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {resultPage && (
              <PageNavigation resultPage={resultPage} getCurPage={getCurPage} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ListUser;
