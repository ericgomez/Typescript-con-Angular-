import { Country, Player } from './player';

export interface Team {
  $key?: string;
  name: string;
  country: Country; // Importamos los enum
  players: Player[]; // Importamos los enum
}
