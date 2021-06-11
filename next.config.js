const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_EXPORT,
} = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === {PHASE_DEVELOPMENT_SERVER}) {
    return {
      env: {
        // env variables common for development phases
        appName: "campus share",
      },
    };
  }
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      env: {
        // env variables common for production phases
        appName: "campus share",
      },
    };
  }
  return {
    env: {
      // env variables common for all phases
      appName: "campus share",
    },
  };
};
