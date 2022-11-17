export default class RestError extends Error {
  constructor(protected _statusCode: number, message: string) {
    super(message);
  }

  public get statusCode(): number {
    return this._statusCode;
  }
}
