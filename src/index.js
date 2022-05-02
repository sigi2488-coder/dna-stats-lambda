const StatsService = require("./services/StatsService");
const constants = require("./utils/constants");

exports.handler = async (event) => {
  try {
    const stats = await new StatsService().getDnaStats();
    console.log("logStats:", stats);
    return {
      statusCode: constants.HTTP_SUCCESS_CODE,
      headers: constants.HEADER,
      body: JSON.stringify(stats),
    };
  } catch (error) {
    throw error;
  }
};
