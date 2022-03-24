export const praperUserList = (users, t) =>
  users.map(({ status, role, profile, ...rest }) => {
    let fullName = '';
    let updateDate = '';
    if (profile) {
      const { name, last_name: lastName, update_date: ud } = profile;
      fullName = `${lastName} ${name}`;
      updateDate = ud;
    }
    return {
      ...rest,
      updateDate,
      fullName,
      role: role ? t(role.name) : '',
      status,
      statusPersian: t(status)
    };
  });
