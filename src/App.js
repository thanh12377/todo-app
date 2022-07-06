import Form from "./components/Form";
import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import Input from "./components/Input";

import "./App.scss";
import Tab from "./components/Tab";


function App() {

  const [id, setId] = useState(1);
  const callbackFunction = (childData) => {
    setId(childData);
  }
  return (
    <Fragment>
      <h1>Todos</h1>
      <Form>
        <Tab callBack = {callbackFunction}>
          <Input tabId = {id}></Input>
          
        </Tab>
      </Form>
    </Fragment>
  )
}

export default App;
