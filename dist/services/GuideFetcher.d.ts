export interface IGuideFetcherConfig {
    segment: string;
    id: Number;
    tableElementId?: string;
    mockRequestUrl?: string;
    callback: Function;
}
/**
 * Parses the response from the GET to JSON, and calls the callback function with JSON.Body as argument.
 */
export default class GuideFetcher {
    private segment;
    private id;
    private requestUrl;
    private mockRequestUrl;
    private callback;
    constructor(config: IGuideFetcherConfig);
    get(): any;
}
