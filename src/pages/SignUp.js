import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Field, Form as FinalForm } from "react-final-form";

import "../App.css";

const signUp_url =
  "https://auth0-microservice-6sditrkx2a-uc.a.run.app/api/v1.0/signup";

axios.defaults.headers.common["ACTION_SECRET"] =
  "KcJAKiGq8yTeSrxrmgdKcQIWf/d8Oirz";

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const SignUp = ({ handleSuccessResponse, handleErrorResponse }) => {
  const formValidation = (values) => {
    const errors = {};

    if (!values.organization_name) {
      errors.organization_name = "organization name is required";
    }

    if (!values.given_name) {
      errors.given_name = "First name is required";
    }

    if (!values.family_name) {
      errors.family_name = "Last name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.password) {
      errors.password = "password is required";
    }

    if (values.password !== values.repeatPassword) {
      errors.password = "Passwords fields do not match";
    }
  };

  const onSubmit = async (values) => {
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

  return (
    <Container fluid>
      <Row>
        <Col
          xl={6}
          className='d-none d-xl-block p-0 vh-100'
          style={{
            backgroundImage: `url('${process.env.PUBLIC_URL}/assets/images/exam.jpg')`,
            backgroundColor: "#ffffff",
            backgroundSize: "cover",
          }}
        ></Col>
        <Col
          className='vh-100 align-items-center d-flex bg-white overflow-hidden'
          xl={6}
        >
          <Card className='border-0 ms-auto me-auto login-card p-2'>
            <Card.Body className='rounded-0 text-left p-5'>
              <FinalForm
                validate={formValidation}
                onSubmit={onSubmit}
                render={({ handleSubmit, values, submitting, pristine }) => (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <h2>Create Your Organization Account</h2>
                    </Row>
                    <Row>
                      <Col>
                        <Field
                          name='organization_name'
                          render={({ input, meta }) => (
                            <Form.Group>
                              <Form.Label>Organization Name</Form.Label>
                              <Form.Control
                                type='text'
                                {...input}
                                placeholder='New Heights Academy'
                              />
                              {meta.error && meta.touched && (
                                <span>{meta.error}</span>
                              )}
                            </Form.Group>
                          )}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Field
                          name='given_name'
                          render={({ input, meta }) => (
                            <Form.Group>
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type='text'
                                {...input}
                                placeholder='Bernice'
                              />
                              {meta.error && meta.touched && (
                                <span>{meta.error}</span>
                              )}
                            </Form.Group>
                          )}
                        />
                      </Col>
                      <Col>
                        <Field
                          name='family_name'
                          render={({ input, meta }) => (
                            <Form.Group>
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                type='text'
                                {...input}
                                placeholder='Odame'
                              />
                              {meta.error && meta.touched && (
                                <span>{meta.error}</span>
                              )}
                            </Form.Group>
                          )}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Field
                          name='email'
                          render={({ input, meta }) => (
                            <Form.Group>
                              <Form.Label>email</Form.Label>
                              <Form.Control
                                type='email'
                                {...input}
                                placeholder='odame.bernice23@gmail.com'
                              />
                              {meta.error && meta.touched && (
                                <span>{meta.error}</span>
                              )}
                            </Form.Group>
                          )}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Field
                          name='password'
                          render={({ input, meta }) => (
                            <Form.Group>
                              <Form.Label>password</Form.Label>
                              <Form.Control type='password' {...input} />
                              {meta.error && meta.touched && (
                                <span>{meta.error}</span>
                              )}
                            </Form.Group>
                          )}
                        />
                      </Col>
                      <Col>
                        <Field
                          name='repeatPassword'
                          render={({ input, meta }) => (
                            <Form.Group>
                              <Form.Label>repeat password</Form.Label>
                              <Form.Control type='password' {...input} />
                              {meta.error && meta.touched && (
                                <span>{meta.error}</span>
                              )}
                            </Form.Group>
                          )}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className='mt-2'>
                        <Button
                          variant='success'
                          type='submit'
                          disabled={submitting || pristine}
                        >
                          submit
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
