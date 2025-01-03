import { evalStats } from "./_shared";
import type { Game } from "../../../../app/modules/games/service/types";
import { RelationshipEnum } from "../../../../shared/types/Character";
import type {
  EvaluatedChoiceOption,
  PictureMain,
  Screen,
} from "../../../../app/modules/screens/service/types";

function evalStatsForLyraAndHunstan(game: Game): EvaluatedChoiceOption[] {
  const options = evalStats(game);
  const newOptions: EvaluatedChoiceOption[] = [];
  options.forEach((option) => {
    const newOption: EvaluatedChoiceOption = {
      type: "save",
      optionText: option.optionText,
      screenId: option.screenId,
      saveValues: [
        {
          savePath: "User.quests.meetLyraForWork.status",
          saveValue: "completed",
        },
      ],
    };
    newOptions.push(newOption);
  });
  return newOptions;
}
const meetLyraForWork: Screen = {
  _id: "meetLyraForWork",
  header: "Belenham",
  main: [
    `You wait for a few minutes outside of the Silver Spoon before you see Lyra
    approaching. She is walking slowly with a tall gruff looking man with a shaggy
    beard. You wave as they head over to you. `,
    {
      url: "Lyra.png",
      alt: "Lyra",
      side: "left",
      sideText: [
        `Hi %%{User.name}, I'm glad to see you again. Hunstan here was 
      wondering if you were even real or if you'd show at all.`,
      ],
    },
    `You look at the man next to her and shake his hand. He grunts at you and
    Lyra laughs.`,
    (game: Game): PictureMain => {
      const hunstanRelationship = game.character.relationships?.find((rel) => {
        rel.name === RelationshipEnum.Hunstan;
      });
      return hunstanRelationship && hunstanRelationship.relationshipValue > 0
        ? {
            url: "Hunstan.png",
            alt: "Hunstan",
            side: "left",
            sideText: [
              `I'm glad to see you not in quite so much trouble, this is a much
        better inn to be staying at. Lyra says you're here looking for work? What're you good at?`,
            ],
          }
        : {
            url: "Hunstan.png",
            alt: "Hunstan",
            side: "left",
            sideText: [
              `The name's Hunstan. I's good to meet you I guess. Lyra says you're
        here looking for work? What're you good at?`,
            ],
          };
    },
  ],
  choiceInformation: {
    text: "What do you tell Hunstan you specialize in?",
    options: evalStatsForLyraAndHunstan,
  },
};

export const screens: Record<string, Screen> = {
  [meetLyraForWork._id]: meetLyraForWork,
};
