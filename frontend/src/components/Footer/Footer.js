import { Col, Container, Row } from "react-bootstrap";
import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Personal Diary
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
