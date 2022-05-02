const index = require("../src/index");
const constants = require("../src/utils/constants");
const StatsService = require("../src/services/StatsService");
describe("index", () => {
  beforeEach(() => {});
  describe("index handler ", () => {
    it("index handler. Success", async () => {
      jest.spyOn(StatsService.prototype, "getDnaStats").mockImplementation(() =>
        Promise.resolve({
          count_mutant_dna: 40,
          count_human_dna: 100,
          ratio: 0.4,
        })
      );

      const result = await index.handler({});
      expect(result.count_mutant_dna).toBe(40);
    });
    it("index handler. Error", async () => {
      jest
        .spyOn(StatsService.prototype, "getDnaStats")
        .mockImplementation(() => Promise.reject(new Error("Error")));
      try {
        await index.handler({});
      } catch (error) {
        expect(error.message).toBe("Error");
      }
    });
  });
});
