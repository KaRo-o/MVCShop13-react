import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Cookies, useCookies } from "react-cookie";

const Header = () => {
  console.log("header");
  const [] = useCookies();
  const cookies = new Cookies();
  console.log(cookies);
  const logout = () => {
    cookies.remove("logon");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">MVC-Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="상품 구매" id="basic-nav-dropdown">
                <NavDropdown.Item href="/listproduct/search">
                  상품검색
                </NavDropdown.Item>
                <NavDropdown.Item href="/chat">채팅</NavDropdown.Item>
              </NavDropdown>

              {cookies.get("logon") != null &&
              cookies.get("logon").userId === "admin" ? (
                <NavDropdown title="관리자 메뉴" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/userlist">
                    회원목록조회
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/addproduct">
                    판매상품등록
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/listProduct/manage">
                    판매상품관리
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {cookies.get("logon") == null ? "" : cookies.get("logon").userId}
            </Navbar.Text>
            &nbsp;&nbsp;&nbsp;
            {cookies.get("logon") == null ? (
              <Navbar.Text>
                <a href="/register">회원가입</a> &nbsp;&nbsp;
                <a href="/login">로그인</a>
              </Navbar.Text>
            ) : (
              <NavDropdown title="유저 메뉴" id="basic-nav-dropdown">
                <NavDropdown.Item
                  href={"/getuser/" + cookies.get("logon").userId}
                >
                  개인정보 조회
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={logout}>
                  로그아웃
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
