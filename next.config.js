const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
} = require("next/constants");

module.exports = (phase) => {
  if (phase === { PHASE_DEVELOPMENT_SERVER }) {
    return {
      env: {
        // env variables common for development phases
      },
    };
  }
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      env: {
        // env variables common for production phases
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
      isHTTPS: false,
      BASE_URL: 'http://localhost:3000',
      CLOUDINARY_CLOUD_NAME: 'campus-share',
      CLOUDINARY_API_KEY: '213328178659842',
      CLOUDINARY_API_SECRET: 'XFVm60T6fC-dIB7RmlAiOB8u5SU',
      CLOUDINARY_UPLOAD_PRESET: 'c135vbnh'
    },
  };
};
