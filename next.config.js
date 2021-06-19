const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");

module.exports = (phase) => {
  if (phase === { PHASE_DEVELOPMENT_SERVER }) {
    return {
      env: {
        // env variables common for development phases
        BASE_URL: 'http://localhost:3000'
      },
    };
  }
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      env: {
        // env variables common for production phases
        NEXTAUTH_URL:"https://yourwebsite.com"
      },
    };
  }
  return {
    env: {
      // env variables common for all phases
      appName: "campus share",
      MONGODB_URI: "mongodb://localhost:27017/campus-share",
      JWT_SECRET: 'thisisasecreatkeywhichwillbechangedhereaswellasinproduction',
      JWT_EXPIRE_IN: '2 days',
      COOKIE_EXPIRE_IN: 60 * 60 * 24 * 2, // 2 days
      isHTTPS: false
    },
  };
};
