export interface IEventType {
  id?: string;
  title: string;
  description: string;
  image: string;
  packages: IPackage[];
}

export interface IPackage {
  id?: string;
  title: string;
  description: string;
  image: string;
  price: number;
}
