
export const getThumborUrl = ({ width, height, src }) => {
  const THUMBOR_SERVER = process.env.REACT_APP_THUMBOR_SERVER_URL
  return THUMBOR_SERVER
    ? `${THUMBOR_SERVER}/unsafe/${width}x${height}/${src}`
    : src
}

export const convertImageUrl = (imageUrl, oldPattern, newPattern) => {
  if (imageUrl) {
    return (imageUrl.replace(oldPattern, newPattern))
  }
  return imageUrl
}
