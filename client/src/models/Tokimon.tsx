export interface Tokimon {
  _id?: string;
  name: string;
  type: string;
  total: number;
}

export interface Element {
  electric: number;
  fly: number;
  fight: number;
  fire: number;
  ice: number;
  water: number;
}

export interface FullTokimon extends Tokimon {
  elements: Element;
  height: number;
  weight: number;
}
