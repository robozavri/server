export class AppError extends Error {
  httpStatusCode: any;
  data: any;

  constructor(message: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
  }
}

export class ResourceNotFoundError extends AppError {
  constructor(message: any) {
    super(message);
    this.httpStatusCode = 404;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: any) {
    super(message);
    this.httpStatusCode = 401;
  }
}

export class ValidationError extends AppError {
  constructor(message: any, data?: any, statusCode?: number) {
    super(message);
    this.data = data;
    this.httpStatusCode = statusCode || 400;
  }
}