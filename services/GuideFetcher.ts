export interface IGuideFetcherConfig {
  segment: string;
  id: Number;
  tableElementId?: string,
  mockRequestUrl?: string;
  callback: Function;
}

/**
 * Parses the response from the GET to JSON, and calls the callback function with JSON.Body as argument.
 */
export default class GuideFetcher {
  private segment: string; // for example "tjekit-all-brands"
  private id: Number; // for example 14115
  private requestUrl: string;
  private mockRequestUrl: string;
  private callback: Function;

  constructor(config: IGuideFetcherConfig) {
    this.segment = config.segment;
    this.id = config.id;
    this.callback = config.callback;
    this.requestUrl = `https://telia-dk.humany.net/${config.segment}/guides/${config.id}?language=da&credentials=true`;
    if (config.mockRequestUrl) {
      this.mockRequestUrl = config.mockRequestUrl;
    }
    this.get();
  }

  public get(): any {
    let callback: Function = this.callback;
    let json: any; // TODO: Define expected interface for JSON response
    let body: any;
    let requestUrl: string = this.mockRequestUrl
      ? this.mockRequestUrl
      : this.requestUrl;

    // TODO: Use fetch
    let request: XMLHttpRequest = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Parse response to JSON
        try {
          json = JSON.parse(request.responseText);
          // Get the guide BODY from the JSON
          body = json.Body;
        } catch {
          body = request.responseText;
        }
        // Create placeholder html element with the body
        if (callback) {
          callback(body);
        }
      }
    };
    request.open("GET", requestUrl, false);
    request.send();
  }
}
