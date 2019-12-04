import React, { useState, useEffect, useRef } from "react";

export default function InputBox({ onSubmit }) {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    inputRef.current.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  });

  const handleSubmit = () => {
    if (value.length > 0) {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <div className="input-box">
      <input
        ref={inputRef}
        className="input-box__input"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <button onClick={handleSubmit} className="input-box__button">
        Send
      </button>
    </div>
  )
}