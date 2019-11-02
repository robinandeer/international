import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Image, Text, Grid } from "grommet";

import { Screenshot, ScreenshotsApiResponse } from "../../../types";
import { selectScreen } from "../../../redux/selectors";

const Placeholder: React.FC = () => (
  <Box
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
      Ask your developer to add screenshots here.
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
    if (screen) {
      fetchScreenshots();
    }
  }, [fetchScreenshots, screen]);

  return (
    <Box
      flex
      background="elevation-1"
      pad="medium"
      style={{ borderRadius: 8 }}
      overflow="auto"
    >
      <Grid rows="auto" gap="small">
        {screenshots.map(image => (
          <Image
            key={image.url}
            src={image.url}
            alt={image.name}
            width="100%"
          />
        ))}

        {screenshots.length === 0 && <Placeholder />}
      </Grid>
    </Box>
  );
};

export default Screenshots;
