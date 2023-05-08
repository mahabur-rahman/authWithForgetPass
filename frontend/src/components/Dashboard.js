import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const history = useNavigate();

  const DashboardValidUser = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token);

    const res = await fetch(`/validuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });

    const data = await res.json();
    // console.log(data);
    if (data.status === 401 || !data) {
      history("*");
    } else {
      console.log(`User verify`);
      history("/dashboard");
    }
  };

  useEffect(() => {
    DashboardValidUser();
  }, []);

  return (
    <>
      <img src="./man.jpg" style={{ width: "200px", marginTop: 20 }} alt="" />
      <h1>User Email: user@gmail.com</h1>
    </>
  );
};

export default Dashboard;
