import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button } from "grommet";

import { selectScreen, selectScreens } from "../../../redux/selectors";
import { updateScreen } from "../../../redux/slices/config";
import Pill from "../../../components/pill";

const ScreenList: React.FC = () => {
  const dispatch = useDispatch();
  const appScreens = useSelector(selectScreens);
  const screen = useSelector(selectScreen);

  const handleClickScreen = useCallback(
    (screen: string): void => {
      dispatch(updateScreen(screen));
    },
    [dispatch, updateScreen]
  );

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
