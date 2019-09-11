import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormField, TextInput, Form, Box } from "grommet";

import { checkAuth, setAuth } from "../redux/slices/auth";
import { RootState } from "../redux/rootReducer";

const CheckAuth: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.email);
  const hasCheckedAuth = useSelector(
    (state: RootState) => state.auth.hasCheckedAuth
  );
  const [formEmail, setFormEmail] = useState("");

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(setAuth(formEmail));
  }, [formEmail, dispatch, setAuth]);

  if (!hasCheckedAuth) {
    return null;
  }

  return email ? (
    (children as React.ReactElement)
  ) : (
    <Box fill align="center" justify="center">
      <Form onSubmit={handleSubmit}>
        <FormField label="Type your email">
          <TextInput
            size="xlarge"
            type="email"
            value={formEmail}
            onChange={({ target: { value } }): void => setFormEmail(value)}
            required
          />
        </FormField>
      </Form>
    </Box>
  );
};

export default CheckAuth;
