import categoriesAPI from "./categories.api";
import followCategoriesAPI from "./followCategories.api";
import followLoungesAPI from "./followLounge.api";
import lecturesAPI from "./lectures.api";
import likesAPI from "./likes.api";
import loungesAPI from "./lounge.api";
import postsAPI from "./posts.api";
import profilesAPI from "./users.api";

const api = {
	lounges: loungesAPI,
	categories: categoriesAPI,
	posts: postsAPI,
	lectures: lecturesAPI,
	likes: likesAPI,
	users: profilesAPI,
	followLounges: followLoungesAPI,
	followCategories: followCategoriesAPI,
};

export default api;
