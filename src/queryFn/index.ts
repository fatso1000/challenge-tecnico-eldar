import handleCustomApiRequest from "@shared/apiService";

const getUrl = "https://jsonplaceholder.typicode.com";

/**
 * Signin user api request
 * @param email email address
 * @param password username used as password
 * @returns a response from the server
 */
const signInUser = async <T>(email: string, password: string) => {
  return await handleCustomApiRequest<T>(
    getUrl + `/users?email=${email}&username=${password}`,
    "GET",
    null
  );
};

const getPostsList = async <T>() => {
  return await handleCustomApiRequest<T>(getUrl + `/posts`, "GET", null);
};

const getPost = async <T>(id: number) => {
  return await handleCustomApiRequest<T>(getUrl + `/posts/${id}`, "GET", null);
};

const deletePost = async <T>(id: number) => {
  return await handleCustomApiRequest<T>(
    getUrl + `/posts/${id}`,
    "DELETE",
    null
  );
};

const addPost = async <T>(formData: unknown) => {
  return await handleCustomApiRequest<T>(getUrl + `/posts`, "POST", formData);
};

const updatePost = async <T>(id: number, formData: unknown) => {
  return await handleCustomApiRequest<T>(
    getUrl + `/posts/${id}`,
    "PUT",
    formData
  );
};

export { signInUser, addPost, updatePost, deletePost, getPost, getPostsList };
