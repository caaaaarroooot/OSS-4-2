import axios from "axios";

const url = "https://66ffa4004da5bd2375515a1d.mockapi.io/api/users";

export const getallUsers = async (id) => {
    id = id || "";
    return await axios.get(`${url}/${id}`);
};

export const addUser = async (user) => {
    return await axios.post(url, user);
};

export const editUser = async (id, user) => {
    return await axios.put(`${url}/${id}`, user);
};

export const deleteUser = async (id) => {
    return await axios.delete(`${url}/${id}`);
};
