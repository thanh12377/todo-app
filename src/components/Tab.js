import { useState, useEffect, Fragment } from "react";
import Input from "./Input";

const tabListModel = [
  {
    id: 1,
    name: "All",
    isClicked: true,
  },
  {
    id: 2,
    name: "Active",
    isClicked: false,
  },
  {
    id: 3,
    name: "Completed",
    isClicked: false,
  },
];
const Tab = (props) => {
  const [tabList, setTabList] = useState([]);
  const handleSwitchTab = (id) => {
    const tabListClone = [...tabList];
    tabListClone.forEach((item) => {
      item.isClicked = false;
    });
    const index = tabListClone.findIndex((item) => item.id === id);
    const foundTab = tabListClone[index];
    tabListClone.splice(index, 1, {
      ...foundTab,
      isClicked: true,
    });
    setTabList(tabListClone);
    // console.log("tab", tabList);
    // console.log(tabListClone);
  };
  useEffect(() => {
    setTabList(tabListModel);
  }, []);
  useEffect(() => {}, [tabList]);
  const sendData = (e) => {
    props.callBack(e);
  };
  return (
    <Fragment>
      <div className="title">
        {tabList.map((tab) => (
          <div
            className={`todoList-action ${tab.isClicked ? "enable" : ""}`}
            onClick={() => {
              handleSwitchTab(tab.id);
              sendData(tab.id);
            }}
          >
            {tab.name}
          </div>
        ))}
      </div>
      {props.children}
    </Fragment>
  );
};

export default Tab;
