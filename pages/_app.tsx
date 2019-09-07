import App from "next/app"
import React from "react"
import { Grommet } from "grommet"

import { MainProvider } from "../src/contexts/main"

const theme = {
  global: {
    colors: {
      background: "#131227",
      "accent-1": "#A17D7C",
      placeholder: "#757576",
      "elevation-1": "rgba(255, 255, 255, 0.05)",
    },
    font: {
      family: "Roboto",
      size: "16px",
    },
  },
  button: {
    color: "white",
    extend: {
      fontWeight: "bold",
    },
  },
}

class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props
    return (
      <MainProvider>
        <Grommet theme={theme} full>
          <Component {...pageProps} />
        </Grommet>
      </MainProvider>
    )
  }
}

export default MyApp
