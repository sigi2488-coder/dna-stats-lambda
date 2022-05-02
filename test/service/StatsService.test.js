const StatsService = require("../../src/services/StatsService");
const aws = require("aws-sdk-mock");
describe("StatsService", () => {
  beforeEach(() => {
    aws.restore();
  });
  describe("StatsService getDnaStats ", async () => {
    it("StatsService getDnaStats. Success", async () => {
      aws.mock("DynamoDB.DocumentClient", "scan", function (params, callback) {
        callback(null, {
          Count: 40,
          ScannedCount: 140,
        });
      });
      const statsService = new StatsService();
      const result = await statsService.getDnaStats();
      expect(result.count_human_dna).toBe(100);
      expect(result.ratio).toBe(0.4);
    });
    it("StatsService getDnaStats. Not data", async () => {
      aws.mock("DynamoDB.DocumentClient", "scan", function (params, callback) {
        callback(null, {
          Count: 0,
          ScannedCount: 0,
        });
      });
      const statsService = new StatsService();
      const result = await statsService.getDnaStats();
      expect(result.count_human_dna).toBe(0);
      expect(result.ratio).toBe(0);
    });
  });
});
