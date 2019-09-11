import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, Button } from "grommet";

import { selectScreen, selectTranslation } from "../../../redux/selectors";
import { updateScreen } from "../../../redux/slices/config";

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
);

const ScreenList: React.FC = () => {
  const dispatch = useDispatch();
  const screen = useSelector(selectScreen);
  const translation = useSelector(selectTranslation);

  const handleClickScreen = useCallback(
    (screen: string): void => {
      dispatch(updateScreen(screen));
    },
    [dispatch, updateScreen]
  );

  let appScreens;
  if (translation) {
    appScreens = Object.keys(translation.language);
  } else {
    appScreens = [];
  }

  return (
    <Box>
      <Text
        weight="bold"
        size="small"
        color="white"
        margin={{ bottom: "xsmall" }}
      >
        Screens
      </Text>
      <Box fill>
        {appScreens.map(appScreen => (
          <Button
            key={appScreen}
            onClick={(): void => handleClickScreen(appScreen)}
          >
            <ListItem title={appScreen} selected={screen === appScreen} />
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default ScreenList;
