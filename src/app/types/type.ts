interface contentItem {
  name: string;
  title: string;
  chapterTitle: string;
  content: string;
  image: string;
}

export interface Data {
  content: contentItem[];
}

export type dataArray = Data[];
