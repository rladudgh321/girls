export interface DataProps {
  id: number;
  title: string;
  content?: string;
}

export interface tagObject {
  id: number;
  name: string;
}

export interface imagesObject {
  id: number;
  src: string;
  postId: string;
}

export interface StringToArrayProps extends DataProps {
  tags: tagObject[];
  images: imagesObject[];
}

export interface StringToArrayPropsWithoutImages extends DataProps {
  tags: tagObject[];
}
