import { useState } from "react";
import { Button } from "react-bootstrap";
import ConfirmationContent from "../components/ConfirmationContent";

import "./pages.css";

const Confirmation = ({
  successResponse,
  errorResponse,
  setShowConfirmation,
}) => {
  if (successResponse) {
    const {
      results: { family_name, given_name },
    } = successResponse;
    // You can interpolate the message with props from the successResponse variable
    return (
      <Confirmation
        left={
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/welcome.png`}
            alt='error'
            width='auto'
            height='80vh'
          />
        }
        right={
          <div className='content__messageCard'>
            <h2>
              Great! {given_name} {family_name}, your account is ready.
            </h2>
            <p>
              Your account has successfully being created. Please check your
              email and verify your account to proceed.
            </p>
          </div>
        }
      />
    );
  } else if (errorResponse) {
    return (
      <ConfirmationContent
        left={
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/error.png`}
            alt='error'
            width='auto'
            height='100vh'
          />
        }
        right={
          <div className='content__messageCard'>
            <h2>An Error occurred please click here to sign up again.</h2>
            <Button
              variant='success'
              onClick={() => setShowConfirmation(false)}
            >
              Sign up again
            </Button>
          </div>
        }
      />
    );
  } else {
    return (
      <ConfirmationContent
        left={
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/error.png`}
            alt='error'
            max-width='auto'
            height='100vh'
          />
        }
        right={
          <div className='content__messageCard'>
            <h2>An Error occurred please click here to sign up again.</h2>
            <Button
              variant='success'
              onClick={() => setShowConfirmation(false)}
            >
              Sign up again
            </Button>
          </div>
        }
      />
    );
  }
  //   return <div>Hello confirmation</div>;
};

export default Confirmation;
