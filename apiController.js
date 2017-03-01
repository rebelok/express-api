const UserService     = require('./services/users');
const TimeCardService = require('./services/timeCards');

const userService     = new UserService();
const timeCardService = new TimeCardService();

const getTimeCardsByName = async name => {
  if (!name) {
    return [];
  }

  const user = await userService.getByLastName(name);
  if (!user) {
    return [];
  }

  return await timeCardService.getByUserId(user.id);
};

const updateTimeCardStatus = async(id, status) => {
  return await timeCardService.updateWithManualStatus(id, status);
};

module.exports = { getTimeCardsByName, updateTimeCardStatus };