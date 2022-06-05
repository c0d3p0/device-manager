import { AxiosRequestHeaders, AxiosResponse } from "axios";

import axiosCamelcase from "../util/AxiosCamelcase";
import credentials from "../data/Credentials";


class AppService
{
  executeRequest = <T>(url?: string, method?: string, params?: any[], body?: any)
      : Promise<AxiosResponse<T, any>> =>
  {
    if(url && method)
    {
      try
      {
        let u = this.addParameters(url, params);

        if(method.toLocaleLowerCase() === "get")
          return axiosCamelcase.get<T>(u, this.createConfig(false, {}));
    
        if(method.toLocaleLowerCase() === "post")
          return axiosCamelcase.post<T>(u, body, this.createConfig(true, {}));
    
        if(method.toLocaleLowerCase() === "patch")
          return axiosCamelcase.patch<T>(u, body, this.createConfig(true, {}));
    
        if(method.toLocaleLowerCase() === "delete")
          return axiosCamelcase.delete<T>(u, this.createConfig(true, {}));
      }
      catch
      {
        throw new Error("Error executing the request");
      }
    }

    throw new Error("Invalid request");
  }

  addParameters = (url: string, params?: any[]) : string =>
  {
    let finalUrl = url;
    let finalParams = params ? params : [];
    finalParams.forEach((param) => {finalUrl += "/" + param});
    return finalUrl;
  }

  convertData = <T>(data: T | T[]) =>
  {
    if(Array.isArray(data))
      return data as T[];
    
    if(data && Object.keys(data).length > 0)
      return [data] as T[];

    return [] as T[];
  }

  readBinaryFile = (args: any) =>
  {
    if(args.file)
    {
      const reader = new FileReader();
      reader.readAsDataURL(args.file);
      reader.onload = (event) => {
        const result = event?.target?.result?.toString() ?? null;
        const data = result?.split(';base64,')[1];
        const dispatchArgs = {previousArgs: args, data};
        args?.successCallback(dispatchArgs);
      };
      reader.onerror = (event) => {
        let dispatchArgs = {previousArgs: args, error: "Couldn't read the file!"};
        args?.errorCallback(dispatchArgs);
      };
    }
  }

  createConfig = (authenticate: boolean,
      attributes: Record<string, string | number | boolean>) =>
  {
    let headers: AxiosRequestHeaders;

    if(authenticate)
    { 
      headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Basic " + credentials.encodeBasicAuth()
      };
    }
    else
    {
      headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };
    }

    return {headers: Object.assign(headers, attributes)};
  }
}


const appService = new AppService();
export default appService;