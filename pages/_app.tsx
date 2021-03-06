import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { Grommet, ThemeType } from "grommet";

import CheckAuth from "../src/components/check-auth";
import store from "../src/redux/store";

const theme: ThemeType = {
  global: {
    colors: {
      background: "#131227",
      "accent-1": "#af908f",
      "accent-2": "rgba(161, 125, 124, 0.15)",
      placeholder: "#757576",
      "elevation-1": "rgba(255, 255, 255, 0.05)",
      text: { dark: "#fff", light: "#fff" },
    },
    font: {
      family: "system-ui",
      size: "16px",
    },
  },
  button: {},
  carousel: {
    animation: {
      duration: 250,
    },
  },
};

class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Grommet theme={theme} full>
          <CheckAuth>
            <Component {...pageProps} />
          </CheckAuth>
        </Grommet>
      </Provider>
    );
  }
}

export default MyApp;
