import React from "react";

const ResultCont = ({ data }) => {
  return (
    <>
      <ul>
        {data?.map((item) => {
          return <li key={item.userid}>{item.tiktok_username}</li>;
        })}
      </ul>
    </>
  );
};

export default ResultCont;
