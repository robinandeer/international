import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text, Button } from "grommet";

import { unsetAuth } from "../../../redux/slices/auth";
import { selectEmail } from "../../../redux/selectors";
import ScreenList from "./screen-list";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);

  const handleClickLogout = useCallback(() => {
    dispatch(unsetAuth());
  }, []);

  return (
    <Box fill justify="between">
      <Box>
        <Box
          margin={{ bottom: "small" }}
          pad="medium"
          background="elevation-1"
          alignSelf="start"
          style={{ borderRadius: 8 }}
        >
          <Text size="large" weight="bold" textAlign="center" color="white">
            I18n
          </Text>
        </Box>

        <ScreenList />
      </Box>

      <Box>
        <Text
          size="xsmall"
          color="placeholder"
          margin={{ bottom: "small" }}
          textAlign="center"
        >
          {email}
        </Text>
        <Button label="Logout" onClick={handleClickLogout} />
      </Box>
    </Box>
  );
};

export default Sidebar;
