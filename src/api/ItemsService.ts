import axios, { AxiosResponse } from "axios";

import { IItems } from "../models/IItems";

const URL = 'https://61338c6c7859e700176a372d.mockapi.io/api/'

export default class UserService {

  static async getItems(): Promise<AxiosResponse<IItems[]>> {
    return axios.get<IItems[]>(`${URL}items/items`)
  }

  static async getItems2(): Promise<AxiosResponse<IItems[]>> {
    return axios.get<IItems[]>(`${URL}items/items2`)
  }

  static async itemsDelete(id: string): Promise<AxiosResponse<string>> {
    return axios.delete<string>(`${URL}items/items/${id}`)
  }

  static async itemsDelete2(id: string): Promise<AxiosResponse<string>> {
    return axios.delete<string>(`${URL}items/items2/${id}`)
  }
}