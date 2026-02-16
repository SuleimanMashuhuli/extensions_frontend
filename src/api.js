const API_URL = import.meta.env.VITE_BASE_API_URL;

export const EXT_ENDPOINTS = {

    CREATE_EXT: `${API_URL}/employees/`, 
    GET_ALL_EXT: `${API_URL}/employees/`,
    UPDATE_EXT: (id) => `${API_URL}/employees/${id}/`,
    DELETE_EXT: (id) => `${API_URL}/employees/${id}/`,
};
  
export default EXT_ENDPOINTS;