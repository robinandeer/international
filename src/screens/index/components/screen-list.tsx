import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button } from "grommet";

import { selectScreen, selectTranslation } from "../../../redux/selectors";
import { updateScreen } from "../../../redux/slices/config";
import Pill from "../../../components/pill";

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
      {appScreens.map(appScreen => (
        <Button
          key={appScreen}
          onClick={(): void => handleClickScreen(appScreen)}
          margin={{ bottom: "xxsmall" }}
        >
          <Pill title={appScreen} selected={screen === appScreen} />
        </Button>
      ))}
    </Box>
  );
};

export default ScreenList;
