import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  TextInput,
  Box,
} from "grommet";

import MainContext from "../../../contexts/main";

const TranslationList: React.FC = () => {
  const {
    translation,
    data,
    setData,
    screen,
    refTranslation,
    refLanguage,
    language,
  } = useContext(MainContext);

  if (translation && data && screen && refTranslation) {
    return (
      <Table
        style={{
          width: "100%",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: 24,
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
                    onChange={(event): void =>
                      setData({
                        ...data,
                        [screen]: {
                          ...data[screen],
                          [key]: event.target.value,
                        },
                      })
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
