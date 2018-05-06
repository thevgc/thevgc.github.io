const apiDomain = 'http://localhost:8000';

export const login = apiDomain + "/authenticate";
export const currentUser = apiDomain + "/user";
export const updateUserProfile = apiDomain + "/user/profile/update";
export const updateUserPassword = apiDomain + "/user/password/update";
