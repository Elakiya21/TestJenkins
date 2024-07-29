export const SET_FIRST_PAGE = "SET_FIRST_PAGE"
export const SET_LAST_PAGE = "SET_LAST_PAGE"

export const setFirstPage = data => ({
  type: SET_FIRST_PAGE,
  data,
})

export const setLastPage = data => ({
  type: SET_LAST_PAGE,
  data,
})
