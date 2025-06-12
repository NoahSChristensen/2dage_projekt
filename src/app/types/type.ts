interface contentItem {
  imageSub: string 
  imageFront: string 
  name: string;
  title: string;
  chapterTitle: string;
  content: string;
  image: string;
  color: [];
}

export interface Data {
  content: contentItem[];
}

export interface color {
  Color: string
}

export type dataArray = Data[];
