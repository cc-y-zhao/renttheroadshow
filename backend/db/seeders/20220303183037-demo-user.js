'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'jeff_winger@rtrs.com',
        username: 'jeff_winger',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'troy_barnes@rtrs.com',
        username: 'troy_barnes',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'abed_nadir@rtrs.com',
        username: 'abed_nadir',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'annie_edison@rtrs.com',
        username: 'annie_edison',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'britta_perry@rtrs.com',
        username: 'britta_perry',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'pierce_hawthorne@rtrs.com',
        username: 'pierce_hawthorne',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'shirley_bennett',
        username: 'shirley_bennett@rtrs.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'ben_chang@rtrs.com',
        username: 'senor_chang',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'dean@rtrs.com',
        username: 'dean_pelton',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: [
        'Demo-lition',
        'FakeUser1',
        'FakeUser2',
        'jeff_winger',
        'troy_barnes',
        'abed_nadir',
        'annie_edison',
        'britta_perry',
        'pierce_hawthorne',
        'shirley_bennett',
        'senor_chang',
        'dean_pelton'
      ] }
    }, {});
  }
};
