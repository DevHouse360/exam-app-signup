import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const signUp_url =
  "https://auth0-microservice-6sditrkx2a-uc.a.run.app/api/v1.0/signup";

axios.defaults.headers.common["ACTION_SECRET"] =
  "KcJAKiGq8yTeSrxrmgdKcQIWf/d8Oirz";

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const SignUp = ({ handleSuccessResponse, handleErrorResponse }) => {
  const handleFormSubmit = async (values) => {
    try {
      const data = {
        organization_name: values?.organization_name,
        given_name: values?.given_name,
        family_name: values?.family_name,
        email: values?.email,
        password: values?.password,
      };
      const result = await axios.post(signUp_url, data);
      const response = result.data;
      // Passing response out to parent component!!
      handleSuccessResponse(response);
      console.log(response);
    } catch (error) {
      handleErrorResponse(error);
      console.log(error);
    }
  };

  const formValidation = (values) => {
    const errors = {};
    if (!values.organization_name) {
      errors.organization_name = "name of organization is required";
    }
    if (!values.given_name) {
      errors.given_name = "first name is required";
    }
    if (!values.family_name) {
      errors.family_name = "last name is required";
    }
    if (!values.email) {
      errors.email = "email is required";
    }

    if (!values.password) {
      errors.password = "password is required";
    }
    if (!values.repeat) {
      errors.repeat = "password confirmation is required";
    }

    return errors;
  };

  return (
    <Container fluid>
      <Row>
        <Col
          xl={6}
          className='d-none d-xl-block p-0 vh-100'
          style={{
            backgroundImage: `url('${process.env.PUBLIC_URL}/assets/images/exam.jpg')`,
            backgroundColor: "#000000",
            backgroundSize: "cover",
          }}
        ></Col>
        <Col
          className='vh-100 align-items-center d-flex overflow-hidden'
          xl={6}
        >
          <Card className='border-0 ms-auto me-auto login-card p-2'>
            <Card.Body className='rounded-0 text-left p-5'>
              <Form onSubmit={handleFormSubmit}>
                <Row>
                  <Col>logo here</Col>
                </Row>
                <Row>
                  <h3>Create Your Organization Account</h3>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <Form.Group>
                      <Form.Label>Organization Name</Form.Label>
                      <Form.Control type='text' name='organization_name' />
                    </Form.Group>
                    <small className='text-danger'>{}</small>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type='text' name='given_name' />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type='text' name='family_name' />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <Form.Group>
                      <Form.Label>email</Form.Label>
                      <Form.Control type='email' name='email' />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <Form.Group>
                      <Form.Label>password</Form.Label>
                      <Form.Control type='password' name='password' />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>repeat password</Form.Label>
                      <Form.Control type='password' name='repeatPassword' />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col className='mt-3'>
                    <Button variant='success' type='submit'>
                      submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
