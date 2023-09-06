import React from "react";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

export default function Spinner() {
  let { isLoading } = useSelector((state) => state.spinnerSlice);

  return isLoading ? (
    <div
      style={{ backgroundColor: "#73AFCA" }}
      className="h-screen w-screen fixed top-0 left-0 z-20 flex justify-center items-center"
    >
      <PulseLoader size={50}  color="#F1C93B" />
    </div>
  ) : (
    <></>
  );
}
