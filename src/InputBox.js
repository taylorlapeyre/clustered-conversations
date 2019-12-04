import React, { useState, useEffect, useRef, useCallback } from "react";

export default function InputBox({ onSubmit }) {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const handleSubmit = useCallback((event) => {
    if (value.length > 0) {
      onSubmit(value, event.metaKey);
      setValue("");
    }
  }, [onSubmit, value]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSubmit(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleSubmit]);

  useEffect(() => inputRef.current.focus(), []);

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