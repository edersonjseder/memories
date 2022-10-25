import {
  POSTS_CREATE,
  POSTS_DELETE,
  POSTS_FAIL,
  POSTS_FETCH_ALL,
  POSTS_FETCH_BY_SEARCH,
  POSTS_LIKE,
  POSTS_UPDATE,
  POSTS_START_LOADING,
  POSTS_END_LOADING,
  POSTS_FETCH_DETAILS,
  POSTS_DETAILS_COMMENTS,
} from "../actions/constants/postsType";

export const postsReducer = (
  state = { isLoading: true, posts: [] },
  action
) => {
  switch (action.type) {
    case POSTS_START_LOADING:
      return { ...state, isLoading: true };
    case POSTS_END_LOADING:
      return { ...state, isLoading: false };
    case POSTS_FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case POSTS_FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case POSTS_FETCH_DETAILS:
      return { ...state, post: action.payload };
    case POSTS_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case POSTS_DETAILS_COMMENTS:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // Change the post that just received the comment
          if (post._id === action.payload._id) return action.payload;
          // return all other posts normally
          return post;
        }),
      };
    case POSTS_CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case POSTS_UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case POSTS_DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case POSTS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
