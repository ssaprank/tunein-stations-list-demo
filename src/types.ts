export type Station = {
  id: string;
  description: string;
  name: string;
  imgUrl: string;
  streamUrl: string;
  reliability: number;
  popularity?: number;
  tags: Array<string>;
};
