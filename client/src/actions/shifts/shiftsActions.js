import axios from "axios";
import { GET_INVENTORY_SETTINGS, ADD_INVENTORY_ITEM } from "./types";

export const getInventorySettings = (api) => dispatch => {
  axios.get(api)
  .then(res => {
    dispatch({
      type: GET_INVENTORY_SETTINGS,
      payload: res.data
    })
  })
  .catch(err => {
  });
}

export const addInventoryItem = (managerId, item ) => dispatch => {
  axios.post(`/api/managers/${managerId}/settings/inventory`, item)
  .then(res => {
    console.log(res);
    dispatch({
      type: ADD_INVENTORY_ITEM,
      payload: res.data
    })
  })
  .catch(err => {
  });
}