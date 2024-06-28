import { ScreenService } from "./screen-service";
import { testGame } from "./screen-service.data.test";

describe("ScreenService", () => {
  describe("getScreenById", () => {
    it("should return a screen by id", () => {
      const screen = ScreenService.getScreenById("0");
      expect(screen._id).toBe("0");
      expect(screen.header).toBe("Welcome, Adventurer!");
    });

    it("should throw an error if screen is not found", () => {
      expect(() => ScreenService.getScreenById("not found")).toThrow(
        new Error("Screen with id: not found not found")
      );
    });
  });

  describe("evaluateMainContent", () => {
    it("should return an array of evaluated main when no evaluation is needed", () => {
      const screen = ScreenService.getScreenById("0");
      const mainContent = ScreenService.evaluateMainContent(
        screen.main,
        testGame
      );
      expect(mainContent).toEqual([
        "This is an adventure game where you make choices to progress.",
      ]);
    });

    it("should return an array of evaluated main when function and string evaluation is needed", () => {
      const screen = ScreenService.getScreenById("meetLyraForWork");
      const mainContent = ScreenService.evaluateMainContent(
        screen.main,
        testGame
      );
      expect(mainContent).toEqual([
        `You wait for a few minutes outside of the Silver Spoon before you see Lyra
    approaching. She is walking slowly with a tall gruff looking man with a shaggy
    beard. You wave as they head over to you. `,
        {
          alt: "Lyra",
          side: "left",
          sideText: [
            `Hi Adventurer, I'm glad to see you again. Hunstan here was 
      wondering if you were even real or if you'd show at all.`,
          ],
          url: "Lyra.png",
        },
        `You look at the man next to her and shake his hand. He grunts at you and
    Lyra laughs.`,
        {
          alt: "Hunstan",
          side: "left",
          sideText: [
            `The name's Hunstan. I's good to meet you I guess. Lyra says you're
        here looking for work? What're you good at?`,
          ],
          url: "Hunstan.png",
        },
      ]);
    });
  });

  describe("evaluateOptions", () => {
    it("should return an array of evaluated options when no evaluation is needed", () => {
      const screen = ScreenService.getScreenById("0");
      const options = ScreenService.evaluateOptions(
        screen.choiceInformation.options,
        testGame
      );
      expect(options).toEqual([
        {
          optionText: "Start",
          screenId: "start",
          type: "screen",
        },
      ]);
    });

    it("should return an array of evaluated options when function evaluation is needed", () => {
      const screen = ScreenService.getScreenById("meetLyraForWork");
      const options = ScreenService.evaluateOptions(
        screen.choiceInformation.options,
        testGame
      );
      expect(options).toEqual([
        {
          optionText: "I'm pretty strong.",
          saveValues: [
            {
              savePath: "User.quests.meetLyraForWork.status",
              saveValue: "completed",
            },
          ],
          screenId: "prettyStrong",
          type: "save",
        },
        {
          optionText: "People say I'm a fair judge.",
          saveValues: [
            {
              savePath: "User.quests.meetLyraForWork.status",
              saveValue: "completed",
            },
          ],
          screenId: "fairJudge",
          type: "save",
        },
      ]);
    });
  });

  describe("unfurlString", () => {
    it("should return a string with no unfurling needed", () => {
      const text = "This is a normal string.";
      const unfurledText = ScreenService.unfurlString(text, testGame);
      expect(unfurledText).toBe("This is a normal string.");
    });

    it("should return a string with unfurling needed", () => {
      const text = "This is a string with a %%{User.name} in it.";
      const unfurledText = ScreenService.unfurlString(text, testGame);
      expect(unfurledText).toBe("This is a string with a Adventurer in it.");
    });
  });

  describe("getObjectPathString", () => {
    it("should return a string with User.name as path", () => {
      const objectPath = "User.name";
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe("Adventurer");
    });
    it("should return a string with User.class as path", () => {
      const objectPath = "User.class";
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe("Bard");
    });
    it("should return a string with User.stats.goodness as path", () => {
      const objectPath = "User.stats.goodness";
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe("5");
    });
    it("should return a string with User.stats.sneakiness as path", () => {
      const objectPath = "User.stats.sneakiness";
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe("0");
    });
    it("should return a string with User.stats.cleverness as path", () => {
      const objectPath = "User.stats.cleverness";
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe("0");
    });
    it("should return a string with User.stats.brawn as path", () => {
      const objectPath = "User.stats.brawn";
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe("5");
    });
    it("should return a string with User.stats.magic as path", () => {
      const objectPath = "User.stats.magic";
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe("0");
    });
    it("should return a string with User.stats.charm as path", () => {
      const objectPath = "User.stats.charm";
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe("0");
    });
    it("should throw an error if User.stats[stat] does not exist", () => {
      const objectPath = "User.stats.notAStat";
      expect(() =>
        ScreenService.getObjectPathString(objectPath, testGame)
      ).toThrow(
        new Error("Cannot read properties of undefined (reading 'toString')")
      );
    });
    it("should return a string with User.gold as path", () => {
      const objectPath = "User.gold";
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe(100);
    });
    it("should return a string with User.pennies as path", () => {
      const objectPath = "User.pennies";
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe(44);
    });
    it("should return a string with User.relationships.Lyra.dayMet (that exists) as path", () => {
      const objectPath = `User.relationships.Lyra.dayMet`;
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe(0);
    });
    it("should return a string with User.relationships.Lyra.relationshipValue (that exists) as path", () => {
      const objectPath = `User.relationships.Lyra.relationshipValue`;
      const objectPathString = ScreenService.getObjectPathString(
        objectPath,
        testGame
      );
      expect(objectPathString).toBe(1);
    });
    it('should throw an error if User.relationships["notACharacter"] does not exist', () => {
      const objectPath = `User.relationships.notACharacter.dayMet`;
      expect(() =>
        ScreenService.getObjectPathString(objectPath, testGame)
      ).toThrow(
        new Error(
          "Cannot read properties of User, relationships,notACharacter,dayMet"
        )
      );
    });
    it("should throw an error if a bad path is passed", () => {
      const objectPath = `User.property.not.real`;
      expect(() =>
        ScreenService.getObjectPathString(objectPath, testGame)
      ).toThrow(new Error("Cannot read properties of User, property,not,real"));
    });
    it("should throw an error if a Bad object is passed", () => {
      const objectPath = `Bad.property.not.real`;
      expect(() =>
        ScreenService.getObjectPathString(objectPath, testGame)
      ).toThrow(new Error("Cannot read properties of Bad, property,not,real"));
    });
  });
});
