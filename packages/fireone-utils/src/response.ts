// tslint:disable-next-line: interface-name
export interface IResponseData<D = any> {
  error: boolean;
  data?: D;
  code?: string;
  message?: string;
}

export class Response {
  public static resolve(data?: any): IResponseData {
    return {
      error: false,
      data,
    };
  }

  public static reject(code: any, message?: any, data?: any): IResponseData {
    return {
      error: true,
      code,
      message,
      data,
    };
  }
}
