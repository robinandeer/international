import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "grommet";

import { selectSavingTranslation } from "../../../redux/selectors";
import { saveTranslation } from "../../../redux/slices/data";

const SaveButton: React.FC = () => {
  const dispatch = useDispatch();
  const saving = useSelector(selectSavingTranslation);

  const handleSaveTranslations = useCallback(() => {
    dispatch(saveTranslation());
  }, []);

  return (
    <Button
      primary
      label={saving ? "Saving..." : "Save changes"}
      onClick={handleSaveTranslations}
      disabled={saving}
    />
  );
};

export default SaveButton;
