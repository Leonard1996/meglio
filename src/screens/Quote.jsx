import React from "react";
import { useNavigate } from "react-router-dom";

export default function Quote() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/quote/auto");
  }, []);

  return <></>;
}
