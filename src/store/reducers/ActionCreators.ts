import {createAsyncThunk} from "@reduxjs/toolkit";
import UserService from "../../api/ItemsService";

export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.getItems()

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("error...")
        }
    }
)

export const fetchItems2 = createAsyncThunk(
    'items2/fetchItems2',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.getItems2()

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("error...")
        }
    }
)

export const fetchItemsDelete = createAsyncThunk(
    'itemsDelete/',
    async (id: string, thunkAPI) => {
        try {
            await UserService.itemsDelete(id)

            return id
        } catch (e) {
            return thunkAPI.rejectWithValue("error...")
        }
    }
)

export const fetchItemsDelete2 = createAsyncThunk(
    'itemsDelete2/',
    async (id: string, thunkAPI) => {
        try {
            await UserService.itemsDelete2(id)

            return id
        } catch (e) {
            return thunkAPI.rejectWithValue("error...")
        }
    }
)