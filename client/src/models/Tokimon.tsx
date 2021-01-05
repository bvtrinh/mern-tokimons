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

// API Format follows this interface
export interface FullTokimon {
  _id?: string;
  name: string;
  height: number;
  weight: number;
  elements: Element;
}

// Form format for create and update
export interface TokimonFormValues extends Element {
  name: string;
  height: number;
  weight: number;
}
