import { RelationshipEnum } from "./Character";

export interface Relationship {
  name: RelationshipEnum;
  dayMet: number;
  relationshipValue: number;
}
