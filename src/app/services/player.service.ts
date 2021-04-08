import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playersDb: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    // Accedemos a la base de datos de firebase, dentro de esta base accedemos a la lista de los jugadores
    // implemetamos una funcionalidad para ordenarla por nombre
    this.playersDb = this.db.list('/players', (ref) =>
      ref.orderByChild('name')
    );
  }

  getPlayers(): Observable<Player[]> {
    // Obtenemos de la base de datos un snapshot de cambios cuando pedimos al informacion
    return this.playersDb.snapshotChanges().pipe(
      // con pipe realizamos modificaciones
      map((changes) => {
        // retornamos una key y obtenemos el resto de la informacion de payload
        return changes.map(
          (c) => ({ $key: c.payload.key, ...c.payload.val() } as Player)
        );
      })
    );
  }

  addPlayer( player: Player) {
    return this.playersDb.push(player);
  }

  deletePlayer( id: string) {
    this.db.list('/players').remove(id);
  }

  editPlayer(newPlayerData: any) {
    const $key = newPlayerData.$key;
    delete(newPlayerData.$key)
    this.db.list('/players').update($key, newPlayerData);
  }
}
