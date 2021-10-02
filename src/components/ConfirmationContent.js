import React from "react";

const ConfirmationContent = ({ left, right }) => {
  return (
    <div className='content'>
      <div className='content__left'>{left}</div>
      <div className='content__right'>{right}</div>
    </div>
  );
};

export default ConfirmationContent;
