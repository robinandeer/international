import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "grommet";

import { selectLanguages, selectLanguage } from "../../../redux/selectors";
import TranslationList from "./translation-list";
import SaveButton from "./save-button";
import { updateLanguage } from "../../../redux/slices/config";

const ScreenTranslations: React.FC = () => {
  const dispatch = useDispatch();
  const languages = useSelector(selectLanguages);
  const language = useSelector(selectLanguage);

  const handleClickLanguage = useCallback(
    (languageCode: string): void => {
      dispatch(updateLanguage(languageCode));
    },
    [languages]
  );

  return (
    <Box align="start">
      <Box
        width="100%"
        direction="row"
        align="center"
        justify="between"
        margin={{ bottom: "small" }}
      >
        <Box direction="row" align="center">
          {languages.map(languageCode => (
            <Button
              key={languageCode}
              primary={languageCode === language}
              label={languageCode}
              onClick={(): void => handleClickLanguage(languageCode)}
              margin={{ right: "small" }}
            />
          ))}
        </Box>
        <SaveButton />
      </Box>
      <TranslationList />
    </Box>
  );
};

export default ScreenTranslations;
