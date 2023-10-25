import React, { useState, useEffect } from "react";
import axios from "axios";
import "./tailwind.css";
import CoffeeButton from "./CoffeeButton";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [result, setResult] = useState("");
  const [showWaiting, setShowWaiting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // 讀取檔案
    axios
      .get("./list.csv")
      .then((response) => {
        setData(response.data.split("\n"));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = () => {
    if (Number(inputValue) < 1 || Number(inputValue) > 50) {
      alert("請輸入 1-50 的數字");
    } else {
      setShowWaiting(true);
      setShowResult(false);
      setResult(data[Number(inputValue) - 1]);
    }
  };

  const inputChange = (e) => {
    setInputValue(e);

    setTimeout(() => {
      setShowWaiting(false);
      setShowResult(true);
    }, 3000);
  };

  return (
    <div className="container">
      <p className="description">
        輸入 1-50 的任一數字，按下確認
      </p>
      <div className="input-container">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => inputChange(e.target.value)}
          className="input"
        />
      </div>
      <button onClick={handleSubmit} className="button mt-5">確認</button>
      <div className="result-container">
        {showWaiting && <img src="./waiting.gif" alt="Loading..." />}
        {inputValue && (
          <div className="result">
            {showResult && <p>{result}</p>}
          </div>
        )}
      </div>
      <div className="mt-20 invisible">
        <CoffeeButton/>
      </div>
    </div>
  );
};

export default App;
