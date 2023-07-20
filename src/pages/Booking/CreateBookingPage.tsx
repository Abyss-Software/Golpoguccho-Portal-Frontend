import React, { useEffect, useRef, useState } from "react";
import Tab from "./Tab";

const CreateBookingPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const onChangeView = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="h-full flex">
      <div className="w-1/4 card shadow-shadowColor shadow-xl">
        <ul>
          <li
            className={`cursor-pointer ${
              activeTab === "tab1" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => {
              setActiveTab("tab1");
            }}
          >
            Booking Information
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "tab2" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => {
              setActiveTab("tab2");
            }}
          >
            Events Information
          </li>
          <li
            className={`cursor-pointer ${
              activeTab === "tab2" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => {
              setActiveTab("tab2");
            }}
          >
            Events Information
          </li>
        </ul>
        <ul className="steps steps-vertical">
          <li className="step step-primary">Booking Info</li>
          <li className="step step-primary">Events Information</li>
          <li className="step">Payment</li>
          <li className="step">Receive Product</li>
        </ul>
      </div>
      <div className="w-3/4 overflow-y-scroll">
        <Tab value="tab1" onChangeView={onChangeView} activeTab={activeTab}>
          <div id="tab1" className="h-[1000px]">
            component 1
          </div>
        </Tab>
        <Tab value="tab2" onChangeView={onChangeView} activeTab={activeTab}>
          <div id="tab2" className="h-[1000px]">
            component 2
          </div>
        </Tab>
      </div>
    </div>
  );
};

export default CreateBookingPage;
