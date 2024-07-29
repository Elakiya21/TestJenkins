import React from "react";
export const handleAuthPlaceHolderGlow = () => {
  return (
    <div>
      <div className="header-height mt-3"> </div>
      <div className="container placeholder-glow">
        <span
          className="placeholder placeholder-xs col-12 text-center"
          style={{ height: "60px" }}
        ></span>
      </div>
      <div className="container mt-5">
        <div className="placeholder-glow ms-md-5 ps-5">
          <span className="row ps-1 py-3 my-1">
            <span className="col-2 me-2"></span>
            <span className="placeholder placeholder-xs col-5 ms-2 ms-md-5"></span>
          </span>
          <span className="row ps-1 py-3 my-1 mt-4">
            <span className="placeholder placeholder-xs col-10 col-md-11 ms-2"></span>
          </span>
          <span className="row ps-1 py-3 my-4">
            <span className="placeholder placeholder-xs col-10 col-md-11 mx-2"></span>
          </span>
          <span className="row ps-1 py-3 my-4">
            <span className="col-1 me-2"></span>
            <span className="placeholder placeholder-xs col-7 mx-2 ms-md-5"></span>
          </span>
        </div>
      </div>
    </div>
  );
};
