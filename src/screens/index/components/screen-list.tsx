import React, { useContext } from "react"
import { Box, Text, Button } from "grommet"

import MainContext from "../../../contexts/main"

const ListItem: React.FC<{ title: string; selected: boolean }> = ({
  title,
  selected,
}) => (
  <Box
    pad={{ horizontal: "small", vertical: "xsmall" }}
    background={selected ? "accent-1" : null}
    style={{ borderRadius: 40 }}
  >
    <Text
      size="small"
      color={selected ? "white" : "placeholder"}
      weight={selected ? "bold" : "normal"}
    >
      {title}
    </Text>
  </Box>
)

const ScreenList: React.FC = () => {
  const { translation, screen, setScreen } = useContext(MainContext)

  let appScreens
  if (translation) {
    appScreens = Object.keys(translation.language)
  } else {
    appScreens = []
  }

  return (
    <Box fill pad="xsmall">
      {appScreens.map(appScreen => (
        <Button key={appScreen} onClick={(): void => setScreen(appScreen)}>
          <ListItem title={appScreen} selected={screen === appScreen} />
        </Button>
      ))}
    </Box>
  )
}

export default ScreenList
