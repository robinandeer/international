import React, { useContext } from "react"
import { Box, Text } from "grommet"

import MainContext from "../../../contexts/main"

const ListItem: React.FC<{ title: string; selected: boolean }> = ({
  title,
  selected,
}) => (
  <Box
    pad="small"
    background={selected ? "brand" : null}
    style={{ borderRadius: 16 }}
  >
    <Text weight={selected ? "bold" : "normal"}>{title}</Text>
  </Box>
)

const ScreenList: React.FC = () => {
  const { translation, screen } = useContext(MainContext)

  let appScreens
  if (translation) {
    appScreens = Object.keys(translation.language)
  } else {
    appScreens = []
  }

  return (
    <Box fill pad="xsmall">
      {appScreens.map(appScreen => (
        <ListItem
          key={appScreen}
          title={appScreen}
          selected={screen === appScreen}
        />
      ))}
    </Box>
  )
}

export default ScreenList
