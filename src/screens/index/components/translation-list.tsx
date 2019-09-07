import React, { useContext } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  TextInput,
  Box,
} from "grommet"

import MainContext from "../../../contexts/main"

const TranslationList: React.FC = () => {
  const { translation, data, setData, screen } = useContext(MainContext)

  if (translation && data && screen) {
    return (
      <Table style={{ width: "100%", background: "#1F192B", borderRadius: 24 }}>
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
                      color="gray"
                      style={{ textDecoration: "line-through" }}
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
    )
  } else {
    return null
  }
}

export default TranslationList
