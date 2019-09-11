import { combineReducers } from "redux-starter-kit";

import authReducer from "./slices/auth";
import configReducer from "./slices/config";
import dataReducer from "./slices/data";

const rootReducer = combineReducers({
  auth: authReducer,
  config: configReducer,
  data: dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
