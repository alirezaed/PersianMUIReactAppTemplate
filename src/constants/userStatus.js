const userStatus = {
  new_user: 1,
  new_user_verified: 2,
  profile_submitted: 3,
  profile_rejected: 4,
  inquiry_submitted: 5,
  inquiry_rejected: 6,
  inquiry_verified: 7,
  active: 8,
  ban: 9
};

export default Object.keys(userStatus);
