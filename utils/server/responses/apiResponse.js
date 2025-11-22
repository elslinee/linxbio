import { STATUS_TYPES } from "./statusTypes";

// Basic schema builder (internal)
const dataSchema = (status, message, data = null, statusCode = 200) => ({
  status,
  message,
  data,
  statusCode,
});

// Unified API response builder
export const apiResponse = {
  success(message, data = null, statusCode = 200) {
    return new Response(
      JSON.stringify(
        dataSchema(STATUS_TYPES.SUCCESS, message, data, statusCode),
      ),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      },
    );
  },

  fail(message, statusCode = 400, data = null) {
    return new Response(
      JSON.stringify(dataSchema(STATUS_TYPES.FAIL, message, data, statusCode)),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      },
    );
  },

  error(message, statusCode = 500, data = null) {
    return new Response(
      JSON.stringify(dataSchema(STATUS_TYPES.ERROR, message, data, statusCode)),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json" },
      },
    );
  },
};
