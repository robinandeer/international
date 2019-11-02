import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  TextInput,
  Box,
} from "grommet";

import {
  selectScreen,
  selectRefTranslation,
  selectRefLanguage,
  selectLanguage,
  selectScreenTranslationList,
  selectCurrentTranslationData,
} from "../../../redux/selectors";
import { updateTranslationData } from "../../../redux/slices/data";

const TranslationList: React.FC = () => {
  const dispatch = useDispatch();
  const screen = useSelector(selectScreen);
  const data = useSelector(selectCurrentTranslationData);
  const refTranslation = useSelector(selectRefTranslation);
  const refLanguage = useSelector(selectRefLanguage);
  const language = useSelector(selectLanguage);
  const screenTranslationList = useSelector(selectScreenTranslationList);

  const handleChangeTranslationData = useCallback(
    (screen: string, key: string, value: string) => {
      const newData = {
        ...data,
        [screen]: {
          ...data[screen],
          [key]: value,
        },
      };

      dispatch(
        updateTranslationData({ languageCode: language, data: newData })
      );
    },
    [data]
  );

  if (screenTranslationList && data && refTranslation) {
    return (
      <Box
        width="100%"
        flex
        overflow={{ vertical: "auto" }}
        pad={{ horizontal: "small" }}
      >
        <Table
          style={{
            width: "100%",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: 8,
          }}
        >
          <TableBody>
            {screenTranslationList.map(key => (
              <TableRow
                key={key}
                style={{
                  borderBottomColor: "#131227",
                  borderBottomWidth: 3,
                  borderBottomStyle: "solid",
                }}
              >
                <TableCell size="small">
                  <Text size="small" textAlign="end" style={{ width: "100%" }}>
                    {key}
                  </Text>
                </TableCell>
                <TableCell>
                  <Box fill pad={{ vertical: "xsmall" }}>
                    {language !== refLanguage && (
                      <Text
                        size="small"
                        color="placeholder"
                        margin={{ bottom: "xxsmall" }}
                      >
                        {refTranslation.language[screen][key]}
                      </Text>
                    )}
                    <TextInput
                      style={{ width: "100%" }}
                      value={data[screen][key]}
                      onChange={({ target: { value } }): void =>
                        handleChangeTranslationData(screen, key, value)
                      }
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  } else {
    return null;
  }
};

export default TranslationList;
