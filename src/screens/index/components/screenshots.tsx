import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Image, Text } from "grommet";

import { Screenshot, ScreenshotsApiResponse } from "../../../types";
import { selectScreen } from "../../../redux/selectors";

const Placeholder: React.FC = () => (
  <Box
    width="small"
    border="all"
    background="elevation-1"
    style={{
      borderStyle: "dashed",
      borderWidth: 2,
      borderColor: "rgba(255, 255, 255, 0.5)",
      borderRadius: 8,
    }}
    align="center"
    justify="center"
    pad="medium"
  >
    <Text color="rgba(255, 255, 255, 0.5)" size="small" textAlign="center">
      Ask your developer to add a screenshot here.
    </Text>
  </Box>
);

const Screenshots: React.FC = () => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const screen = useSelector(selectScreen);

  const fetchScreenshots = useCallback(async () => {
    const response = await fetch(`/api/screenshots?screen=${screen}`);
    const data = (await response.json()) as ScreenshotsApiResponse;
    setScreenshots(data.screenshots);
  }, [screen]);

  useEffect(() => {
    fetchScreenshots();
  }, [fetchScreenshots]);

  return (
    <Box
      background="elevation-1"
      pad="medium"
      style={{ borderRadius: 8 }}
      direction="row"
      height="100%"
      overflow={{ horizontal: "auto" }}
    >
      {screenshots.map(image => (
        <Image
          style={{ display: "block" }}
          key={image.url}
          src={image.url}
          alt={image.name}
          fit="contain"
        />
      ))}

      {screenshots.length === 0 && <Placeholder />}
    </Box>
  );
};

export default Screenshots;
