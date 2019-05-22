export var expiration = process.env.JWT_EXPIRATION_MS
    ? parseInt(process.env.JWT_EXPIRATION_MS)
    : 24 * 60 * 60 * 1000;
export var secret = process.env.JWT_SECRET || '70p53cr37';
export var origin = process.env.ORIGIN || 'http://localhost:3000';
export var port = process.env.PORT || 4000;
export var resetDb = process.env.RESET_DB || false;
