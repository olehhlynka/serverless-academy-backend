class DBQueryError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class DBSaveError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class DBConnectionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { DBConnectionError, DBQueryError, DBSaveError };
