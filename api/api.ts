import categoriesAPI from "./categories.api";
import loungesAPI from "./lounge.api";
import postsAPI from "./posts.api";

const api = {
	lounges: loungesAPI,
	categories: categoriesAPI,
	posts: postsAPI,
};

export default api;
