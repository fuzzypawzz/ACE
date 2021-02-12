import getUrlParameterByName from "../search-result-extender/functions/getUrlParameterByName";

interface IConfiguration {
  urlQuery: string;
  InputFieldSelector: string;
  targetInputName: string;
  searchKey: string;
}

export default class HumanyNotificationDetector {
  private urlQuery: string;
  private InputFieldSelector: string;
  private targetInputName: string;
  private searchKey: string = "searchkey";

  constructor(config: IConfiguration) {
    this.urlQuery = config.urlQuery;
    this.InputFieldSelector = config.InputFieldSelector;
    this.targetInputName = config.targetInputName;
    this.searchKey = config.searchKey;
  }

  private detectUrl(): boolean {
    if (window.location.href.indexOf(this.urlQuery) > -1) {
      return true;
    }
  }

  public returnUrlParam(param: string): string {
    return getUrlParameterByName(param);
  }

  public setInputFieldValue() {
    const inputs = document.querySelectorAll(this.InputFieldSelector);
    inputs.forEach((element: any) => {
      if (element.name == this.targetInputName) {
        element.value = this.returnUrlParam(this.searchKey);
      }
    });
  }
}
