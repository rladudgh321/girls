export interface DataProps {
  id: string;
  title: string;
  content1?: string;
  content2?: string;
  content3: string;
}

export interface tagObject {
  id: string;
  name: string;
}

export interface imagesObject {
  id: string;
  src: string;
  postId: string;
}

export interface StringToArrayProps extends DataProps {
  tags: tagObject[];
  images1: imagesObject[];
  images2: imagesObject[];
  images3: imagesObject[];
}

export interface StringToArrayPropsWithoutImages extends DataProps {
  tags: tagObject[];
}

export interface generateMetadataPostType extends Omit<StringToArrayProps, 'images1' | 'images2' | 'images3'> {
  images: imagesObject[]
}