class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  
    // هنا ضفنا ميثود ثابت "create" عشان تستخدمه
    static create(message, statusCode) {
      return new AppError(message, statusCode);
    }
  }
  
  export default AppError;
  