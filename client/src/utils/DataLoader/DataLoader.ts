import axios from "axios";

class DataLoader {
  private baseUrl = 'http://localhost:4321/api/';
  protected url: string;
  protected params: any;
  public data = null;
  public error: any = null;

  constructor(url: string, params?: any) {
    this.url = this.baseUrl + url;
    this.params = params;
  }

  public async get(params?: any): Promise<any> {
    try {
      const response = await axios.get(this.url, { params: params || this.params });
      this.error = null;
      this.data = response.data;      
    } catch(error) {
      this.error = error;
      this.data = null;
    }
    return this.data;
  }
}

export default DataLoader;