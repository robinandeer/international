import React from "react";
import { Box, Text } from "grommet";

import PulseSpinner from "./pulse-spinner";

const PillButton: React.FC<{
  title: string;
  selected: boolean;
  loading?: boolean;
}> = ({ title, selected, loading }) => (
  <Box
    pad={{ horizontal: "small", vertical: "xsmall" }}
    background={selected ? "accent-2" : null}
    style={{ borderRadius: 8 }}
    direction="row"
  >
    <Text
      size="medium"
      color={selected ? "accent-1" : "placeholder"}
      weight={selected ? "bold" : "normal"}
    >
      {title}
    </Text>
    {loading && (
      <Box margin={{ left: "xsmall" }}>
        <PulseSpinner />
      </Box>
    )}
  </Box>
);

export default PillButton;
