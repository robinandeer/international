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
      "elevation-1": "#1F192B",
    },
    font: {
      family: "Roboto",
      size: "16px",
    },
  },
  tab: {
    color: "placeholder",
    active: {
      background: "accent-1",
      color: "white",
      borderRadius: "8px",
    },
    border: {
      size: "0",
    },
    pad: { horizontal: "small" },
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
