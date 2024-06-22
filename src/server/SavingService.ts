import { Quest, QuestStatus } from "../shared/types/Quest";
import { Character, UserClass } from "../shared/types/Character";
import { dayZeroQuests } from "../data/data/Day0/quests";
import { parseSavePath } from "./helper";
import {
  setClass,
  setCoins,
  updateMotivations,
  setName,
  updateRelationship,
  updateStat,
  setUser,
  updateQuest,
  updateSkills,
  setTavern,
  getUser,
} from "./user";
import { GameRepository } from "../data-access/game-repository";
import { Game } from "../shared/types/Game";

export class SavingService {
  constructor(private gameRepository: GameRepository) {}

  async saveGame(gameId: string, screenId: string) {
    const user = getUser();
    if (gameId) {
      const currentGame = await GameRepository.getGame(gameId);
      if (currentGame) {
        // await this.gameRepository.updateGame(gameId, user, screenId);
        // return gameId;
      }
    }
    // const game = await this.gameRepository.insertGame(user, screenId);
    // return game._id;
    return gameId;
  }

  async updateGame(gameId: string, user: Character, screenId: string) {
    await this.gameRepository.updateGame(gameId, user, screenId);
  }

  static saveContent(input: string, savePath: string): Character {
    const { ObjectName, propertyPath } = parseSavePath(savePath);
    if (ObjectName === "User") {
      if (propertyPath[0] === "name") {
        setName(input);
      } else if (propertyPath[0] === "class") {
        setClass(input as UserClass);
      } else if (propertyPath[0] === "stats") {
        updateStat(input, propertyPath[1]);
      } else if (propertyPath[0] === "coins") {
        setCoins(input);
      } else if (propertyPath[0] === "motivations") {
        updateMotivations(input);
      } else if (propertyPath[0] === "relationships") {
        updateRelationship(input, propertyPath[1]);
      } else if (propertyPath[0] === "quests") {
        updateQuest(input, propertyPath[1], propertyPath[2] || undefined);
      } else if (propertyPath[0] === "skills") {
        updateSkills(input);
      } else if (propertyPath[0] === "tavern") {
        setTavern(input);
      } else {
        throw Error(`Property not found: ${propertyPath[0]}`);
      }
    } else {
      throw Error(`Object not found ${ObjectName}`);
    }
    return getUser();
  }

  static async loadGame(gameId: string): Promise<Game> {
    const game = await GameRepository.getGame(gameId);
    return game;
  }

  static restartGame() {
    setUser({
      _id: "",
      quests: this.restartQuests(dayZeroQuests),
      money: {
        gold: 10,
        pennies: 0,
      },
      stats: {
        goodness: 0,
        sneakiness: 0,
        cleverness: 0,
        brawn: 0,
        magic: 0,
        charm: 0,
      },
      relationships: {},
      skills: [],
      motivations: [],
      name: "",
    });
    localStorage.removeItem("user");
    localStorage.removeItem("screenId");
  }

  static restartQuests(quests: { [key: string]: Quest }) {
    for (const key in quests) {
      quests[key].status = QuestStatus.notFound;
    }
    return quests;
  }
}
