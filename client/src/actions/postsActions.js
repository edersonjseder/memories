import * as api from "../api";
import {
  POSTS_CREATE,
  POSTS_DELETE,
  POSTS_FAIL,
  POSTS_FETCH_ALL,
  POSTS_FETCH_BY_SEARCH,
  POSTS_UPDATE,
  POSTS_START_LOADING,
  POSTS_END_LOADING,
  POSTS_FETCH_DETAILS,
  POSTS_DETAILS_COMMENTS,
} from "./constants/postsType";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: POSTS_START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: POSTS_FETCH_DETAILS, payload: data });
    dispatch({ type: POSTS_END_LOADING });
  } catch (error) {
    dispatch({
      type: POSTS_FAIL,
      payload: error,
    });
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: POSTS_START_LOADING });
    const { data } = await api.fetchPosts(page);
    console.log("Action: getPosts -> ", data);
    dispatch({ type: POSTS_FETCH_ALL, payload: data });
    dispatch({ type: POSTS_END_LOADING });
  } catch (error) {
    dispatch({
      type: POSTS_FAIL,
      payload: error,
    });
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: POSTS_START_LOADING });
    console.log("searchQuery:", searchQuery);
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: POSTS_FETCH_BY_SEARCH, payload: data });
    dispatch({ type: POSTS_END_LOADING });
  } catch (error) {
    dispatch({
      type: POSTS_FAIL,
      payload: error,
    });
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: POSTS_START_LOADING });
    const { data } = await api.createPost(post);

    console.log("Action -> DATA: ", data);

    history.push(`/posts/${data._id}`);

    dispatch({
      type: POSTS_CREATE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_FAIL,
      payload: error,
    });
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({
      type: POSTS_UPDATE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_FAIL,
      payload: error,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: POSTS_DELETE, payload: id });
  } catch (error) {
    dispatch({
      type: POSTS_FAIL,
      payload: error,
    });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({
      type: POSTS_UPDATE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_FAIL,
      payload: error,
    });
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: POSTS_DETAILS_COMMENTS, payload: data });
    return data.comments;
  } catch (error) {
    dispatch({
      type: POSTS_FAIL,
      payload: error,
    });
  }
};
