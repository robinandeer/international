import React from "react"
import { Box, Text } from "grommet"

import SelectBranch from "./select-branch"

const Header: React.FC = () => {
  return (
    <Box
      fill
      direction="row"
      justify="between"
      align="center"
      pad={{ horizontal: "medium" }}
    >
      <Text size="medium">Internationalization</Text>
      <SelectBranch />
    </Box>
  )
}

export default Header
