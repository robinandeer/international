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
  selectTranslation,
  selectTranslationData,
  selectRefTranslation,
  selectRefLanguage,
  selectLanguage,
} from "../../../redux/selectors";
import { updateTranslationData } from "../../../redux/slices/data";

const TranslationList: React.FC = () => {
  const dispatch = useDispatch();
  const screen = useSelector(selectScreen);
  const translation = useSelector(selectTranslation);
  const data = useSelector(selectTranslationData);
  const refTranslation = useSelector(selectRefTranslation);
  const refLanguage = useSelector(selectRefLanguage);
  const language = useSelector(selectLanguage);

  const handleChangeTranslationData = useCallback(
    (screen: string, key: string, value: string) => {
      const newData = {
        ...data,
        [screen]: {
          ...data[screen],
          [key]: value,
        },
      };

      dispatch(updateTranslationData(newData));
    },
    [data]
  );

  if (translation && data && screen && refTranslation) {
    return (
      <Table
        style={{
          width: "100%",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: 8,
        }}
      >
        <TableBody>
          {Object.entries(translation.language[screen]).map(([key, value]) => (
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
                  {data[screen][key] !== value && (
                    <Text
                      size="small"
                      color="placeholder"
                      style={{ textDecoration: "line-through" }}
                      margin={{ top: "xxsmall" }}
                    >
                      {value}
                    </Text>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return null;
  }
};

export default TranslationList;
