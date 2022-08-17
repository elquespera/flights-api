import axios from "axios";
import { DataLoadedCallback } from "../utils/common.types";

class DataLoader {
  private baseUrl = 'http://localhost:4321/api/';
  protected url: string;
  protected params: any;
  protected callback: DataLoadedCallback | undefined;
  public data = [];
  public error: any = null;

  constructor(url: string, params?: any, callback?: DataLoadedCallback) {
    this.url = this.baseUrl + url;
    this.params = params;
    this.callback = callback;
    this.get(params, callback);
  }

  public async get(params?: any, callback?: DataLoadedCallback): Promise<any> {
    try {
      const response = await axios.get(this.url, { params: params || this.params });
      this.error = null;
      this.data = response.data;
      if (callback) this.callback = callback;
      if (this.callback) this.callback(this.data);  
    } catch(error) {
      this.error = error;
      this.data = [];
    }
    return this.data;
  }
}

export default DataLoader;