import React from "react";
import classnames from "classnames";
import "./button.css";

const Button = (props) => {
  const {
    onClick,
    children,
    secondary,
    className,
    disabled = false,
    typeName,
    isLoading,
    primaryClassName,
  } = props;
  return (
    <div className={`${primaryClassName}`}>
      <div className={isLoading ? `placeholder-glow` : ``}>
        <button
          type={typeName || "button"}
          className={classnames(className, {
            "btn-primary": !secondary,
            "btn-secondary": secondary,
            placeholder: isLoading,
          })}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      </div>
    </div>
  );
};

export default Button;
