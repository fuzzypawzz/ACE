export default function enrichWithIds(data: Array<any>): Array<any> {
  // TODO: Get prefix from constant
  const prefix: string = "newsArticle_";
  let number: number = 15931;
  data.forEach((element) => {
    element.id = `${prefix}${number}`;
    number++;
  });
  return data;
}
