import React from "react";
import { useSelector } from "react-redux";
import { Box, Text } from "grommet";

import { selectEmail } from "../../../redux/selectors";

const Header: React.FC = () => {
  const email = useSelector(selectEmail);

  return (
    <Box fill justify="center">
      <Text size="medium" margin={{ bottom: "xxsmall" }} weight="bold">
        Internationalization
      </Text>
      <Text size="small" color="accent-1">
        {email}
      </Text>
    </Box>
  );
};

export default Header;
