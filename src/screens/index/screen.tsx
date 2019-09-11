import React, { useEffect } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid } from "grommet";

import {
  selectBranch,
  selectRefLanguage,
  selectLanguage,
} from "../../redux/selectors";
import ScreenList from "./components/screen-list";
import Header from "./components/header";
import ScreenTranslations from "./components/screen-translations";
import Screenshots from "./components/screenshots";
import { fetchLanguages } from "../../redux/slices/config";
import { fetchRefTranslation, fetchTranslation } from "../../redux/slices/data";

const IndexScreen: NextPage = () => {
  const dispatch = useDispatch();
  const branch = useSelector(selectBranch);
  const refLanguage = useSelector(selectRefLanguage);
  const language = useSelector(selectLanguage);

  useEffect(() => {
    if (language && branch) {
      dispatch(fetchTranslation());
    }
  }, [language, branch]);

  React.useEffect(() => {
    if (branch && refLanguage) {
      dispatch(fetchRefTranslation());
    }
  }, [branch, refLanguage]);

  React.useEffect(() => {
    dispatch(fetchLanguages());
  }, []);

  return (
    <Grid
      fill
      rows={["xxsmall", "flex"]}
      columns={["small", "flex"]}
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "nav", start: [0, 1], end: [0, 1] },
        { name: "main", start: [1, 1], end: [1, 1] },
      ]}
    >
      <Box gridArea="header">
        <Header />
      </Box>
      <Box gridArea="nav">
        <ScreenList />
      </Box>
      <Box gridArea="main">
        <Grid fill rows={["1/2", "1/2"]}>
          <Box pad="small">
            <Screenshots />
          </Box>
          <Box pad="small">
            <ScreenTranslations />
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default IndexScreen;
