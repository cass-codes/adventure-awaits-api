import { Game } from "../../../../app/modules/games/service/types";
import { SaveChoiceOption } from "../../../../shared/types/Screen";

export function evalStats(
  game: Game
): Pick<SaveChoiceOption, "type" | "optionText" | "screenId">[] {
  const options: Pick<SaveChoiceOption, "type" | "optionText" | "screenId">[] =
    [];
  if (game.character.stats.brawn > 0) {
    options.push({
      type: "save",
      optionText: "I'm pretty strong.",
      screenId: "prettyStrong",
    });
  }
  if (game.character.stats.goodness > 0) {
    options.push({
      type: "save",
      optionText: "People say I'm a fair judge.",
      screenId: "fairJudge",
    });
  }
  if (game.character.stats.sneakiness > 0) {
    options.push({
      type: "save",
      optionText: "I'm good a sneaking around.",
      screenId: "sneakingAround",
    });
  }
  if (game.character.stats.cleverness > 0) {
    options.push({
      type: "save",
      optionText: "I'm clever and good with books.",
      screenId: "cleverBooks",
    });
  }
  if (game.character.stats.magic > 0) {
    options.push({
      type: "save",
      optionText: "I'm decent with magic and the arcane.",
      screenId: "magicAndArcane",
    });
  }
  if (game.character.stats.charm > 0) {
    options.push({
      type: "save",
      optionText: "I'm good with people.",
      screenId: "goodWithPeople",
    });
  }
  return options;
}
