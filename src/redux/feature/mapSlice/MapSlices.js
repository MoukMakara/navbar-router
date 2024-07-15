import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const initialState = {
  sprotClups: [],
  status: "idle",
  error: null,
};

export const fetchMaps = createAsyncThunk("sprotClups/fetchMaps", async()=>{
    const response = await fetch(
      `http://136.228.158.126:50003/api/sportclubs/all/`
    );
    const data = await response.json();
    //console.log("event all api ", data.results);
    return data.results;
});

export const MapSlice = createSlice({
  name: "sprotClups",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
      .addCase(fetchMaps.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMaps.fulfilled, (state, action) => {
        (state.status = "success"), (state.sprotClups = action.payload);
      })
      .addCase(fetchMaps.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      });
  }
});
export default MapSlice.reducer;

export const seleteAllMaps = (state) => state.map.sprotClups;