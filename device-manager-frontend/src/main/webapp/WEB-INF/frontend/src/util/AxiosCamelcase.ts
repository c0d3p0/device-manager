import axios from "axios";
import camelCaseKeys from "camelcase-keys";


const axiosCamelcase = axios.create();
axiosCamelcase.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return {
      ...response,
      data: camelCaseKeys(response.data, { deep: true }),
    }
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)


export default axiosCamelcase;