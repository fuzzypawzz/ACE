interface ITemplateContent {
    author: string;
    date: string;
    headline: string;
    body: any;
}
/**
 *
 * @param data Data that should be merged into values in the markup
 * Sample of argument
 * {
        author: "Jannik Maag",
        date: "28 Januar 2021",
        headline: "My awesome template!",
        body: "<p><span>Some nested body stuff!</span></p>"
    }
 */
export default function newsItemTemplate(data: ITemplateContent): string;
export {};
