interface IConfiguration {
    targetListElement?: NodeList;
    stringToQuery: string;
    infoText?: string;
    buttonText?: string;
    onClickRedirectUrl?: string;
    searchKey: string;
}
export default class SearchResultExtender {
    private targetListElement;
    private stringToQuery;
    private infoText;
    private buttonText;
    private onClickRedirectUrl;
    private searchKey;
    constructor(config: IConfiguration);
    private getTargetElement;
    createInfoBox(): void;
    private addButtonClickListener;
    private appendInfoBox;
}
export {};
