import { useState } from "react";

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
      <div>
        <h2>
          Welcome, {given_name} {family_name}!
        </h2>
        Your account has successfully being created. Please check your email and
        verify your account to proceed.
      </div>
    );
  } else if (errorResponse) {
    return (
      <div>
        An Error occurred please click here to sign up again.
        <button onClick={() => setShowConfirmation(false)}>
          Sign up again
        </button>
      </div>
    );
  } else {
    return (
      <div>
        An Error occurred please click here to sign up again.
        <button onClick={() => setShowConfirmation(false)}>
          Sign up again
        </button>
      </div>
    );
  }
  //   return <div>Hello confirmation</div>;
};

export default Confirmation;
