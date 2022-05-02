const constants = require("../utils/constants");
const aws = require("aws-sdk");

class StatsService {
  constructor() {
    this.dynamoDb = new aws.DynamoDB.DocumentClient({
      region: constants.REGION_AWS,
    });
  }

  /**
   * @name getDnaStats
   * @return {JSON}
   *
   */
  async getDnaStats() {
    const params = {
      TableName: constants.APPLICANTS_TABLE_NAME,
      FilterExpression: "#isMutantName = :isMutantValue",
      ExpressionAttributeValues: { ":isMutantValue": true },
      ExpressionAttributeNames: { "#isMutantName": "isMutant" },
      Select: "COUNT",
    };
    const results = await this.dynamoDb.scan(params).promise();
    const countHumanDna = results.ScannedCount - results.Count;
    const ratio = countHumanDna === 0 ? 0 : results.Count / countHumanDna;
    return {
      count_mutant_dna: results.Count,
      count_human_dna: results.ScannedCount - results.Count,
      ratio: ratio,
    };
  }
}

module.exports = StatsService;
