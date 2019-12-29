

export class OperationResult {

  success: boolean = false;
  msg: string;

  resultObj: any;
  errorObj: any;

  constructor(success: boolean = false, msg: string = null, resultObj?: any) {
  
    this.success = success;
    this.msg = msg;
    this.resultObj = resultObj;
  }

  setError(err?: any, msg?: any): void {

    this.errorObj = err;
    this.msg = msg;
    this.success = false;
  }
}