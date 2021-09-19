import { useState } from "react";
import "./App.css";
import SignUp from "./pages/SignUp";
import Confirmation from "./pages/Confirmation";

function App() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);
  const handleSuccessResponse = (res) => {
    setSuccessResponse(res);
    setShowConfirmation(true);
  };
  const handleErrorResponse = (error) => {
    // use this to show if signup was not successful
    setErrorResponse(error);
    setShowConfirmation(true);
  };
  return (
    <>
      {showConfirmation && (successResponse || errorResponse) ? (
        <Confirmation
          successResponse={successResponse}
          errorResponse={errorResponse}
          setShowConfirmation={setShowConfirmation}
        />
      ) : (
        <SignUp
          handleSuccessResponse={handleSuccessResponse}
          handleErrorResponse={handleErrorResponse}
        />
      )}
    </>
  );
}

export default App;
