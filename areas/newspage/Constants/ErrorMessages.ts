export class ErrorMessages {
  static readonly developerModeIsOn: string =
    "Developer mode is ON. Remember to turn off developer mode before deploying to production!";

  static readonly missingConfigurationFile: string =
    "There is no configuration";

  static readonly couldNotFindTableId: string =
    "No table with the provided id exists";

  static readonly NOT_ARRAY_OR_EMPTY: string =
    "The argument is either not an Array or does not contain any data";

  static readonly COULD_NOT_UPDATE_DOM: string =
    "Target element with the provided id does not exist";
}
