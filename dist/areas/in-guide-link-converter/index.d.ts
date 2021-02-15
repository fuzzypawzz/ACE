interface IConfiguration {
    guideToQuery: string;
    guideContentArea: string;
    specialLinkIdentifiers: Array<Object>;
}
export default class InGuideLinkConverter {
    private guideToQuery;
    private guideContentArea;
    private specialLinkIdentifiers;
    private guideNode;
    constructor(config: IConfiguration);
    /**
     * Consumer can use this to check if the guide is available..
     * and only execute convertGuideToLinks() once guide is available
     */
    isGuideAvailable(): boolean;
    convertGuideLinks(): void;
    private createIconWithLink;
    private getGuideNode;
}
export {};
