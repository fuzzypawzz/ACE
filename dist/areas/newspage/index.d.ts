interface INewsPageConfig {
    guideIds: Number[];
    tableElementId: string;
    segment: string;
}
export default class NewsPage {
    guideIds: Array<Number>;
    private segment;
    private tableElementId;
    /**
     *
     * @param newsPageConfig See the INewsPageConfig interface
     * { segment: "tjekit-all-brand", guideIds: [32323, 23232, 1232131], tableElementId: "_someId" }
     */
    constructor(newsPageConfig: INewsPageConfig);
    private init;
    private handler;
}
export {};
