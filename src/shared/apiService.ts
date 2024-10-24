import { PetitionResponse } from "../types";
import { HttpStatusCode } from "../types/httpStatusCode";

const handleCustomApiRequest = async <T = unknown>(
  request: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  body: unknown = undefined
) => {
  try {
    const fetching = await fetch(request, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: [["Content-Type", "application/json"]],
    });

    const response = await fetching.json(),
      statusCode = fetching.status;

    return handleStatusCode<T>(statusCode, response);
  } catch (error: unknown) {
    return {
      errors: error,
      message: "Unknown error",
      data: undefined,
    } as PetitionResponse<undefined>;
  }
};

const handleStatusCode = async <T>(
  statusCode: HttpStatusCode,
  response: unknown
) => {
  switch (statusCode) {
    case HttpStatusCode.OK:
      return {
        message: undefined,
        errors: [],
        data: response as T,
      } as PetitionResponse<T>;
    case HttpStatusCode.CREATED:
      return {
        message: undefined,
        errors: [],
        data: response as T,
      } as PetitionResponse<T>;

    default:
      return {
        message: "unexpected status code",
        errors: [],
        data: undefined,
      } as PetitionResponse<undefined>;
  }
};

export default handleCustomApiRequest;
