import React, { useContext, useState, useCallback } from "react"
import { Box, Menu, Layer, Form, FormField, TextInput, Button } from "grommet"

import MainContext from "../../../contexts/main"

const SelectBranch: React.FC = () => {
  const { branch, branches, setBranch, setBranches } = useContext(MainContext)
  const [showModal, setShowModal] = useState(false)
  const [branchName, setBranchName] = useState("")

  const handleSubmitNewBranch = useCallback(async () => {
    await fetch("/api/branches", {
      method: "POST",
      body: JSON.stringify({ name: branchName }),
    })

    setBranches([...branches, branchName])
    setBranch(branchName)
    setBranchName("")
    setShowModal(false)
  }, [branches, branchName])

  return (
    <>
      <Menu
        label={branches.length > 0 ? branch : "Select branch..."}
        items={[
          ...branches.map(branchName => ({
            label: branchName,
            onClick: (): void => setBranch(branchName),
          })),
          {
            label: "New branch",
            onClick: (): void => setShowModal(true),
          },
        ]}
      />

      {showModal && (
        <Layer
          onEsc={(): void => setShowModal(false)}
          onClickOutside={(): void => setShowModal(false)}
        >
          <Box pad="medium">
            <Form onSubmit={handleSubmitNewBranch}>
              <FormField label="Branch name">
                <TextInput
                  placeholder="branch-name"
                  required
                  value={branchName}
                  onChange={({ target: { value } }): void =>
                    setBranchName(value)
                  }
                />
              </FormField>
              <Box direction="row">
                <Button
                  label="Close"
                  onClick={(): void => setShowModal(false)}
                  margin={{ right: "medium" }}
                />
                <Button primary type="submit" label="Create" />
              </Box>
            </Form>
          </Box>
        </Layer>
      )}
    </>
  )
}

export default SelectBranch
