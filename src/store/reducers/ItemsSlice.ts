import { PayloadAction } from "@reduxjs/toolkit";
import { IItems } from "../../models/IItems";
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'
import { fetchItems, fetchItems2, fetchItemsDelete, fetchItemsDelete2 } from "./ActionCreators";

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

interface ItemsState {
  items: IItems[];
  isLoading: boolean;
  error: string;
  count_quantity: number;
}

const initialState: ItemsState = {
  items: [],
  isLoading: false,
  error: '',
  count_quantity: 0
}

export const itemsSlice = createAppSlice({
  name: 'items',
  initialState,
  reducers: {
    countQuantity: (state) => {
      state.count_quantity = 0
      state.items.forEach((item) => {
        state.count_quantity += item.quantity
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<IItems[]>) => {
        state.error = '';

        action.payload.forEach((item) => {
          item.key = parseInt(item.id)
        })

        state.items = [...state.items, ...action.payload];
      })
      .addCase(fetchItems2.fulfilled, (state, action: PayloadAction<IItems[]>) => {
        state.error = '';
        action.payload.forEach((item) => {
          item.key = parseInt(item.id);
        });

        state.items = [...state.items, ...action.payload];

        state.items = state.items.sort((a,b) => a.price - b.price)

        state.items.forEach((item) => {
          state.count_quantity += item.quantity
        })

        state.isLoading = false;
      })
      .addCase(fetchItemsDelete.fulfilled, (state, action: PayloadAction<string>) => {

        state.items = state.items.filter(item => item.id !== action.payload.toString());
      })
      .addCase(fetchItemsDelete2.fulfilled, (state, action: PayloadAction<string>) => {

        state.items = state.items.filter(item => item.id !== action.payload.toString());
      })
  },
})


export const itemsReducers = itemsSlice.reducer;
