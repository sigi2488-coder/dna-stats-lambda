const StatsService = require("./services/StatsService");

exports.handler = async (event) => {
  try {
    const stats = await new StatsService().getDnaStats();
    console.log("logStats:", stats);
    return stats;
  } catch (error) {
    throw error;
  }
};
