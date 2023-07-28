export interface IEventType {
  id?: number;
  title: string;
  description: string;
  image: File;
}

export interface IPackage {
  id?: number;
  title: string;
  description: string;
  image: File;
  price: number;
}
