import { createSlice } from "@reduxjs/toolkit";

let start = 0,
  limit = 5,
  dataLength = 0,
  dataLengthIndex = 0;

export const dataTableSlice = createSlice({
  name: "dataTable",
  initialState: {
    data: [],
    displayData: [],
    page: 0,
  },
  reducers: {
    appendData: (state, action) => {
      state.data.push(...action.payload);
      dataLength = state.data.length;
      dataLengthIndex = state.data[state.data.length - 1].id;
    },

    setDisplayData: (state, action) => {
      state.displayData = state.data.slice(
        action.payload.start,
        action.payload.start + action.payload.limit
      );
    },

    deleteItem: (state, action) => {
      const removalIndex = state.data.findIndex((item) => item.id === action.payload.id);
      dataLengthIndex = state.data[state.data.length - 1].id;
      state.data.splice(removalIndex, 1);
      dataLength = state.data.length;
    },

    updateItem: (state, action) => {
      state.data.find((item) => item.id === action.payload.id).title = action.payload.title;
    },
  },
});

export const deleteRow = ({ id }) => async (dispatch) => {
  dispatch(deleteItem({ id }));
  const data = await fetchData("http://jsonplaceholder.typicode.com/photos", dataLengthIndex, 1);
  dataLengthIndex = dataLengthIndex + 1;

  dispatch(appendData(data));
  dispatch(setDisplayData({ start, limit }));
};

export const updateRow = ({ id, title }) => async (dispatch) => {
  dispatch(updateItem({ id, title }));
  dispatch(setDisplayData({ start, limit }));
};

export const previousAsync = () => async (dispatch) => {
  if (start >= limit) start -= limit;
  dispatch(setDisplayData({ start, limit }));
};

export const nextAsync = () => async (dispatch) => {
  start = start + limit;
  if (start + limit > dataLength) {
    const data = await fetchData(
      "http://jsonplaceholder.typicode.com/photos",
      dataLengthIndex,
      limit
    );
    dataLengthIndex = dataLengthIndex + limit;
    dispatch(appendData(data));
  }
  dispatch(setDisplayData({ start, limit }));
};

export const fetchAPIData = () => async (dispatch) => {
  const data = await fetchData("http://jsonplaceholder.typicode.com/photos", start, limit);
  dispatch(appendData(data));
  dispatch(setDisplayData({ start, limit }));
  dataLengthIndex = start + limit;
};

async function fetchData(url, start, limit) {
  const response = await fetch(`${url}?_start=${start}&_limit=${limit}`);
  const data = await response.json();
  return data;
}

export const { setDisplayData, appendData, deleteItem, updateItem } = dataTableSlice.actions;
export const selectDisplayData = (state) => state.dataTable.displayData;
export default dataTableSlice.reducer;
