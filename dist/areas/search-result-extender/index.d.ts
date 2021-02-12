interface IConfiguration {
    targetListElement?: NodeList;
    stringToQuery: string;
    callback?: Function;
    infoText?: string;
    buttonText?: string;
}
export default class searchResultExtender {
    private targetListElement;
    private stringToQuery;
    private callback;
    private infoText;
    private buttonText;
    constructor(config: IConfiguration);
    private getTargetElement;
    createInfoBox(): void;
    private addButtonClickListener;
    private appendInfoBox;
}
export {};
