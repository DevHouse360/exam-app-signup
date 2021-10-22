import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

axios.defaults.headers.common[
  "ACTION_SECRET"
] = `${process.env.REACT_APP_ACTION_SECRET}`;

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const SignUp = ({ handleSuccessResponse, handleErrorResponse }) => {
  const initialFormValues = {
    organization_name: "",
    given_name: "",
    family_name: "",
    email: "",
    password: "",
    repeatPassword: "",
    isShowPassword: false,
  };
  const [formValues, setformValues] = useState(initialFormValues);
  const [formErrors, setformErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { value, type, checked, name } = e.target;
    type === "checkbox"
      ? setformValues({ ...formValues, [name]: checked })
      : setformValues({ ...formValues, [name]: value });
  };

  const formValidation = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.organization_name.trim()) {
      errors.organization_name = "name of organization is required";
    }
    if (!values.given_name.trim()) {
      errors.given_name = "first name is required";
    }
    if (!values.family_name.trim()) {
      errors.family_name = "last name is required";
    }
    if (!values.email.trim()) {
      errors.email = "email is required";
    } else if (!emailRegex.test(values.email.trim())) {
      errors.email = "this is not a valid email";
    }

    if (!values.password.trim()) {
      errors.password = "password is required";
    } else if (values.password.trim().length <= 6) {
      errors.password = "password can not be less than 6 characters";
    } else {
    }
    if (!values.repeatPassword.trim()) {
      errors.repeatPassword = "password confirmation is required";
    } else if (values.password !== values.repeatPassword) {
      errors.repeatPassword = "passwords do not match";
    }

    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setformErrors(formValidation(formValues));
    setIsSubmitted(true);
  };

  console.log(process.env);

  useEffect(() => {
    const submitForm = async () => {
      try {
        const data = {
          organization_name: formValues?.organization_name,
          given_name: formValues?.given_name,
          family_name: formValues?.family_name,
          email: formValues?.email,
          password: formValues?.password,
        };
        const result = await axios.post(
          `${process.env.REACT_APP_SIGNUP_URL}`,
          data
        );
        const response = result.data;
        // Passing response out to parent component!!
        handleSuccessResponse(response);
        console.log(response);
      } catch (error) {
        handleErrorResponse(error);
        console.log(error);
      }
    };

    if (Object.keys(formErrors).length === 0 && isSubmitted) {
      submitForm();
    }
  }, [
    formErrors,
    formValues?.email,
    formValues?.family_name,
    formValues?.given_name,
    formValues?.organization_name,
    formValues?.password,
    handleErrorResponse,
    handleSuccessResponse,
    isSubmitted,
  ]);
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
                      <Form.Control
                        type='text'
                        name='organization_name'
                        value={formValues.organization_name}
                        placeholder='name of your organization'
                        onChange={handleFormChange}
                      />
                      <small className='text-danger'>
                        {formErrors.organization_name}
                      </small>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type='text'
                        name='given_name'
                        onChange={handleFormChange}
                        value={formValues.given_name}
                      />
                      <small className='text-danger'>
                        {formErrors.given_name}
                      </small>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type='text'
                        name='family_name'
                        onChange={handleFormChange}
                        value={formValues.family_name}
                      />
                      <small className='text-danger'>
                        {formErrors.family_name}
                      </small>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <Form.Group>
                      <Form.Label>email</Form.Label>
                      <Form.Control
                        type='email'
                        name='email'
                        onChange={handleFormChange}
                        value={formValues.email}
                      />
                      <small className='text-danger'>{formErrors.email}</small>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <Form.Group>
                      <Form.Label>password</Form.Label>
                      <Form.Control
                        type={formValues.isShowPassword ? "text" : "password"}
                        name='password'
                        onChange={handleFormChange}
                        value={formValues.password}
                      />
                      <small className='text-danger'>
                        {formErrors.password}
                      </small>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>confirm password</Form.Label>
                      <Form.Control
                        type={formValues.isShowPassword ? "text" : "password"}
                        name='repeatPassword'
                        onChange={handleFormChange}
                        value={formValues.repeatPassword}
                      />
                      <small className='text-danger'>
                        {formErrors.repeatPassword}
                      </small>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <Form.Group>
                      <Form.Check
                        type='checkbox'
                        label='show password'
                        name='isShowPassword'
                        value={formValues.isShowPassword}
                        onChange={handleFormChange}
                      />
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
