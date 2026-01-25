import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.example.com',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private readonly client: AxiosInstance;

  get axios() {
    this.client.interceptors.request.use(async (config) => {
      const token = ""; // TODO: user token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config;
    })
    return this.client;
  }
}
