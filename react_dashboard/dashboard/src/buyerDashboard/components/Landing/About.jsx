import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import farm from "../images/farm.jpg";
import jumbo from "../images/jumbo.jpg";

import "./About.css";

const About = () => {
  console.log("About component rendered");

  const handleShopNowClick = () => {
    alert("Please login to continue");
  };

  return (
    <React.Fragment>
      {/* Custom Jumbotron Alternative */}
      <div
        style={{
          backgroundImage: `url(${jumbo})`,
          backgroundSize: "cover",
          textAlign: "center",
          padding: "100px 20px",
          color: "#fff",
          marginBottom: "0px",
        }}
      >
        <h1 className="jumbo-title">ABOUT US</h1>
      </div>

      <Container>
        <Row>
          <Col xs={6} md={4}>
            <div>
              <img className="about-img" src={farm} alt="Farmer" />
            </div>
          </Col>
          <Col sm>
            <Card className="about-card">
              <Card.Body>
                <Card.Title className="about-card-title">
                  Welcome to AGRI CONNECT
                </Card.Title>
                <Card.Text className="about-card-text">
                  "AGRI CONNECT is a dedicated platform designed to empower farmers and buyers by providing a seamless marketplace. With secure transactions, efficient product management, and an intuitive user experience, we make agricultural trade simple and hassle-free. Whether you're a farmer looking to showcase your produce or a buyer searching for high-quality farm products, our platform ensures smooth and transparent interactions."
                </Card.Text>
                <Card.Text className="about-card-text">
                  "Join our growing community and experience a smarter way to connect, trade, and grow in the agricultural sector."
                </Card.Text>
                <Button variant="success" onClick={handleShopNowClick}>
                  Shop now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default About;

