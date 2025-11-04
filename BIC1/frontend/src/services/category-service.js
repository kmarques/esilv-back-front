import api from "./api";

export default {
  getCategories: async function () {
    const response = await api("/categories");
    if (response.status === 401) {
      alert("You need to be connected");
      throw new Error("You need to be connected");
    }
    return await response.json();
  },
  createCategory: async function (category) {
    const response = await api("/categories", {
      method: "POST",
      body: JSON.stringify(category),
    });
    if (response.status === 401) {
      alert("You need to be connected");
      throw new Error("You need to be connected");
    }
    return await response.json();
  },
  deleteCategory: async function (id) {
    const response = await api(`/categories/${id}`, {
      method: "DELETE",
    });
    if (response.status === 401) {
      alert("You need to be connected");
      throw new Error("You need to be connected");
    }
    return;
  },
  updateCategory: async function (id, category) {
    const response = await api(`/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(category),
    });
    if (response.status === 401) {
      alert("You need to be connected");
      throw new Error("You need to be connected");
    }
    return await response.json();
  },
};
