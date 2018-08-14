import axios from "axios";
import { GET_INVENTORY_SETTINGS } from "./types";

export const getInventorySettings = (api) => dispatch => {
  axios.get(api)
  .then(res => {
    dispatch({
      type: GET_INVENTORY_SETTINGS,
      payload: res.data.settings
    })
  })
  .catch(err => {
  });
}
