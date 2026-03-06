export const APARMENT_TYPES = ['APARTAMENT', 'COMPOUND'] as const;
export type APARMENTS_TYPE = typeof APARMENT_TYPES[number]


export interface IAparmentData {
  beds: string;
  description: string;
  mainFeature: string;
  maxPeople: string;
  name: string;
  displayName: string;
  rooms: string;
  type: APARMENTS_TYPE;
  priority?: number;
}