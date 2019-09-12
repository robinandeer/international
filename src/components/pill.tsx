import React from "react";
import { Box, Text } from "grommet";

const PillButton: React.FC<{
  title: string;
  selected: boolean;
}> = ({ title, selected }) => (
  <Box
    pad={{ horizontal: "small", vertical: "xsmall" }}
    background={selected ? "accent-2" : null}
    style={{ borderRadius: 8 }}
  >
    <Text
      size="medium"
      color={selected ? "accent-1" : "placeholder"}
      weight={selected ? "bold" : "normal"}
    >
      {title}
    </Text>
  </Box>
);

export default PillButton;
