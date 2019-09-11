import React, { useCallback, useState, useEffect } from "react";
import { Box, Image } from "grommet";
import { useSelector } from "react-redux";

import { Screenshot, ScreenshotsApiResponse } from "../../../types";
import { selectScreen } from "../../../redux/selectors";

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
      style={{ borderRadius: 24 }}
      direction="row"
      height="100%"
    >
      {screenshots.map(image => (
        <Image
          key={image.url}
          src={image.url}
          alt={image.name}
          height="100%"
          width="auto"
        />
      ))}
    </Box>
  );
};

export default Screenshots;
