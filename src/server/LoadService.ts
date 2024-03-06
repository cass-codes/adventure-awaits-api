import { getUser } from "./user";

export class LoadService {
  static loadUser() {
    return getUser();
  }
}
