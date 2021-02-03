interface INewsPageConfig {
    guideIds: Number[];
    tableElementId: string;
    segment: string;
}
export default class NewsPage {
    private guideIds;
    private segment;
    private tableElementId;
    tableData: Array<any>;
    /**
     *
     * @param newsPageConfig See the INewsPageConfig interface
     * { segment: "tjekit-all-brand", guideIds: [32323, 23232, 1232131], tableElementId: "_someId" }
     */
    constructor(newsPageConfig: INewsPageConfig);
    init(): void;
    private handler;
    private updateDOM;
}
export {};
