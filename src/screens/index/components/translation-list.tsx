import React, { useContext } from "react"
import { Table, TableBody, TableCell, TableRow, Text, TextInput } from "grommet"

import MainContext from "../../../contexts/main"

const TranslationList: React.FC = () => {
  const { translation, data, setData, screen } = useContext(MainContext)

  if (translation && data && screen) {
    return (
      <Table style={{ width: "100%" }}>
        <TableBody>
          {Object.entries(translation.language[screen]).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell size="small">
                <Text size="small" textAlign="end" style={{ width: "100%" }}>
                  {key}
                </Text>
              </TableCell>
              <TableCell>
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
