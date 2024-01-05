import React from "react";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const App = () => {
  return (
    <Provider store={appStore}>
      <div className=" ">
        <Body />
      </div>
    </Provider>
  );
};

export default App;
