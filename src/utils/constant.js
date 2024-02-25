// Base URL for your API
export const API_BASE_URL = {
  LOCAL: "https://api.example.com",
  DEV: "https://api.example.com",
  UAT: "https://api.example.com",
};

// HTTP Status Codes
export const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

// Messages
export const Messages = {
  SUCCESS: {
    CREATED: "Resource created successfully.",
    UPDATED: "Resource updated successfully.",
    DELETED: "Resource deleted successfully.",
  },
  FAILURE: {
    NOT_FOUND: "Resource not found.",
    UNAUTHORIZED: "Unauthorized access.",
    SERVER_ERROR: "Internal server error.",
  },
};
