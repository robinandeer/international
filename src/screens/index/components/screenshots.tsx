import React, { useContext, useCallback, useState, useEffect } from "react"
import { Box } from "grommet"

import MainContext from "../../../contexts/main"

const Screenshots: React.FC = () => {
  const { screen } = useContext(MainContext)

  return (
    <Box background="elevation-1" style={{ borderRadius: 16 }}>
      Screenshots
    </Box>
  )
}

export default Screenshots
