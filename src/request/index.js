import axios from "axios";
// import queryString from "qs";

const request = axios.create({
  baseURL: "https://musicapp-api.azurewebsites.net/",
  headers: {
    "Content-Type": "application/json",
  },
  //withCredentials: true,
  // paramsSerializer: (params) =>
  //   queryString.stringify(params, { arrayFormat: "comma" }),
});

export const getRequest = (url, params = null, options = null) =>
  request.get(url, { params, ...options });

export const postRequest = (url, data, params = null, options = null) =>
  request.post(url, data, { params, ...options });

export const putRequest = (url, data, params = null, options = null) =>
  request.put(url, data, { params, ...options });

export const patchRequest = (url, data, params = null, options = null) =>
  request.patch(url, data, { params, ...options });

export const deleteRequest = (url, params = null, options = null) =>
  request.delete(url, { params, ...options });

export const downloadRequest = (url, params = null, options = null) =>
  request.get(url, { params, ...options, responseType: "blob" });

export const replaceInUrl = (url, pathVariables = {}) => {
  const keys = Object.keys(pathVariables);
  if (!keys.length) {
    return url;
  }

  return keys.reduce(
    (acc, key) => acc.replace(`{${key}}`, pathVariables[`${key}`]),
    url
  );
};

export const addHeaderToken = (token) => {
  request.defaults.headers.Authorization = `Bearer ${token}`;
};

export const addHeaderCookie = (key, value) => {
  request.defaults.headers[`${key}`] = value;
};

export const removeHeaderToken = () => {
  delete request.defaults.headers.Authorization;
};

// If you pass function to interceptor of axios, it only adds that function
// to existing array of interceptor functions. That causes that same function
// of interceptors getting called multiple times instead of just one time, as it
// is supposed to do. Thats why there is 'global' axios interceptor array, which indicates
// axios to eject previous interceptor. This approach requires that every middleware has its
// unique name from which it is being recognized. Every object in those arrays contains
// interceptor name and ID of interceptor function.
let axiosInterceptorRequests = [];
let axiosInterceptorResponses = [];

export const attachPostRequestListener = (
  postRequestListener,
  interceptorName
) => {
  let previousAxiosInterceptor = axiosInterceptorResponses.find(
    (item) => item.name === interceptorName
  );
  let previousAxiosInterceptorResponses = axiosInterceptorResponses;
  if (previousAxiosInterceptor !== undefined) {
    request.interceptors.response.eject(previousAxiosInterceptor.interceptorID);
    previousAxiosInterceptorResponses = axiosInterceptorResponses.filter(
      (item) => item.interceptorID !== previousAxiosInterceptor.interceptorID
    );
  }
  let axiosInterceptorID = request.interceptors.response.use(
    (response) => response,
    (response) => postRequestListener(response)
  );
  previousAxiosInterceptorResponses.push({
    name: interceptorName,
    interceptorID: axiosInterceptorID,
  });
  axiosInterceptorResponses = [...previousAxiosInterceptorResponses];
};

export const attachBeforeRequestListener = (
  beforeRequestListener,
  interceptorName
) => {
  let previousAxiosInterceptor = axiosInterceptorRequests.find(
    (item) => item.name === interceptorName
  );
  let previousAxiosInterceptorRequests = axiosInterceptorRequests;
  if (previousAxiosInterceptor !== undefined) {
    request.interceptors.request.eject(previousAxiosInterceptor.interceptorID);
    previousAxiosInterceptorRequests = axiosInterceptorRequests.filter(
      (item) => item.interceptorID !== previousAxiosInterceptor.interceptorID
    );
  }
  let axiosInterceptorID = request.interceptors.request.use(
    (response) => beforeRequestListener(response),
    (response) => response
  );
  previousAxiosInterceptorRequests.push({
    name: interceptorName,
    interceptorID: axiosInterceptorID,
  });
  axiosInterceptorRequests = [...previousAxiosInterceptorRequests];
};

export const apiDefaultUrl = request.defaults.baseURL;
