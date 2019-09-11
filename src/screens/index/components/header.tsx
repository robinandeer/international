import React from "react";
import { useSelector } from "react-redux";
import { Box, Text } from "grommet";

import { selectEmail } from "../../../redux/selectors";

const Header: React.FC = () => {
  const email = useSelector(selectEmail);

  return (
    <Box
      fill
      direction="row"
      justify="between"
      align="center"
      pad={{ horizontal: "medium" }}
    >
      <Text size="medium">Internationalization</Text>
      <Text size="medium">{email}</Text>
    </Box>
  );
};

export default Header;
