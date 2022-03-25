import { backendLocation } from './__env'

export const createUser = () => `${backendLocation}/api/users`

export const getUser = () => `${backendLocation}/api/users/user`

export const editUser = () => `${backendLocation}/api/users/user`

export const deleteUser = () => `${backendLocation}/api/users/user`

export const getUserbyID = (userID) => `${backendLocation}/api/users/id/${userID}`

export const getUserbyEmail = (email) => `${backendLocation}/api/users/email/${email}`

export const uploadAvatar = () => `${backendLocation}/api/users/user/avatar`

export const deleteAvatar = () => `${backendLocation}/api/users/user/avatar`

export const getUserPicture = (userID, size = 'small') => `${backendLocation}/api/users/pic-id/${userID}/avatar?size=${size}`

export const userExistence = (email) => `${backendLocation}/api/users/user/exists?email=${email}`

export const loginUser = () => `${backendLocation}/api/users/login`

export const logoutUser = () => `${backendLocation}/api/users/logout`

export const logoutUserAll = () => `${backendLocation}/api/users/logout/all`
