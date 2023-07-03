export namespace App {
  export const PORT = process.env.PORT || 3000;
  export const PROTOCOL = "http";
  export const DOMAIN = "localhost";
}

export namespace DB {
  export const PASSWORD =
    process.env.DB_PASSWORD || "qwerty";
  export const USER = process.env.DB_USER || "postgres";
  export const HOST = process.env.DB_HOST || "localhost";
  export const PORT =
    parseInt(process.env.DB_PORT as string, 10) || 5432;
  export const NAME = process.env.DB_NAME || "links";
}

export namespace Link {
  export const SHORT_PATH_LENGTH = 6;
  export const URL_CHARACTERS =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
}
