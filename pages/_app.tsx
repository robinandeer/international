import App from "next/app"
import React from "react"
import { Grommet } from "grommet"

import { MainProvider } from "../src/contexts/main"

const theme = {
  global: {
    colors: {
      brand: "#228BE6",
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
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
