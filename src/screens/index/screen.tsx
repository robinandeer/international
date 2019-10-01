import React from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid } from "grommet";

import { fetchTranslation } from "../../redux/slices/data";
import { fetchLanguages } from "../../redux/slices/config";
import {
  selectBranch,
  selectRefLanguage,
  selectLanguage,
  selectCurrentTranslation,
  selectRefTranslation,
} from "../../redux/selectors";
import ScreenTranslations from "./components/screen-translations";
import Screenshots from "./components/screenshots";
import Sidebar from "./components/sidebar";

const IndexScreen: NextPage = () => {
  const dispatch = useDispatch();
  const branch = useSelector(selectBranch);
  const refLanguage = useSelector(selectRefLanguage);
  const language = useSelector(selectLanguage);
  const currentTranslation = useSelector(selectCurrentTranslation);
  const refTranslation = useSelector(selectRefTranslation);

  React.useEffect(() => {
    dispatch(fetchLanguages());
  }, []);

  React.useEffect(() => {
    if (branch && refLanguage && currentTranslation && !refTranslation) {
      dispatch(fetchTranslation(refLanguage));
    }
  }, [branch, refLanguage, currentTranslation, refTranslation]);

  React.useEffect(() => {
    if (language && branch && !currentTranslation) {
      dispatch(fetchTranslation(language));
    }
  }, [language, branch, currentTranslation]);

  return (
    <Grid
      style={{ height: "100vh", width: "100vw" }}
      columns={["small", "flex"]}
    >
      <Box pad={{ horizontal: "small", vertical: "medium" }}>
        <Sidebar />
      </Box>
      <Box pad={{ vertical: "medium", right: "medium" }}>
        <Box style={{ flex: 1 }} margin={{ bottom: "medium" }}>
          <Screenshots />
        </Box>
        <Box style={{ flex: 1, flexShrink: 0 }}>
          <ScreenTranslations />
        </Box>
      </Box>
    </Grid>
  );
};

export default IndexScreen;
