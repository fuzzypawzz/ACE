interface IConfiguration {
    urlQuery: string;
    InputFieldSelector: string;
    targetInputName: string;
    searchKey: string;
}
export default class HumanyNotificationDetector {
    private urlQuery;
    private InputFieldSelector;
    private targetInputName;
    private searchKey;
    constructor(config: IConfiguration);
    detectUrl(): boolean;
    returnUrlParam(param: string): string;
    setInputFieldValue(): void;
}
export {};
