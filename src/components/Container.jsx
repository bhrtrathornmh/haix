import React, { useEffect, useState } from "react";
import ResultCont from "./ResultCont";
import "./container.css";

const Container = () => {
  const [inputText, setInputText] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [mode, setMode] = useState("useraccount");
  const [userAccount, setUserAccount] = useState(false);
  const [checkBox, setCheckBox] = useState(false);

  console.log("neww", userAccount);

  const handleInput = (event) => {
    event.preventDefault();
    setInputText(event.target.value);
  };
  useEffect(() => {
    if (userAccount) {
      setMode("useraccount");
    }
    if (checkBox) {
      setMode("hashtag");
    }
  }, [userAccount, checkBox]);

  useEffect(() => {
    if (inputText.length > 3) {
      const fetchData = async () => {
        let accountMode;
        if (mode === "useraccount") {
          accountMode = "";
        } else if (mode === "hashtag") {
          accountMode = "_hashtag";
        }
        const res = await fetch(
          `https://alivecore360.com/tiktok${accountMode}?account_name=${inputText}&key=b84cfdd9-5a65-4679-a297-dcf8529ca80e&tiktok_type=userhashtags`
        );
        const resData = await res.json();
        const data = resData;
        setFetchedData(data);
      };
      fetchData();
    }
  }, [inputText, userAccount, checkBox, mode]);

  console.log("modee", mode);

  return (
    <div style={{ border: "1px solid black" }}>
      <header className="header">
        <div
          style={{
            justifyContent: "center",
            borderBottom: "2px solid black",
            marginBottom: "10px",
          }}
        >
          <img
            src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png"
            alt="TikTok icon"
            style={{ height: "40px", width: "40px" }}
          />
        </div>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search anything"
          value={inputText}
          onChange={handleInput}
        />
      </div>
      <div className="filter-options">
        <label htmlFor="user-account">
          <input
            type="checkbox"
            id="user-account"
            checked={userAccount}
            onChange={() => setUserAccount(!userAccount)}
          />
          User Account
        </label>
        <label htmlFor="check-box">
          <input
            type="checkbox"
            id="check-box"
            checked={checkBox}
            onChange={() => setCheckBox(!checkBox)}
          />
          Hash Tag
        </label>
      </div>
      <ResultCont data={fetchedData} />
    </div>
  );
};

export default Container;
