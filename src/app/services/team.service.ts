import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Team } from '../interfaces/team';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// Creamos un objecto con las cabeceras de nuestra tabla
export const TeamTableHeaders = ['Name', 'Country', 'Players'];

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsDb: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    // Accedemos a la base de datos de firebase, dentro de esta base accedemos a la lista de los equipos
    // implemetamos una funcionalidad para ordenarla por nombre
    this.teamsDb = this.db.list('/teams', ref => ref.orderByChild('name'));
  }

  getTeams(): Observable<Team[]> {
    // Obtenemos de la base de datos un snapshot de cambios cuando pedimos al informacion
    return this.teamsDb.snapshotChanges().pipe(
      // con pipe realizamos modificaciones
      map((changes) => {
        // retornamos una key y obtenemos el resto de la informacion de payload
        return changes.map(
          (c) => ({ $key: c.payload.key, ...c.payload.val() } as Team)
        );
      })
    );
  }

  addTeam( team: Team) {
    return this.teamsDb.push(team);
  }

  deleteTeam( id: string) {
    this.db.list('/teams').remove(id);
  }

  editTeam(newTeamData: any) {
    const $key = newTeamData.$key;
    delete(newTeamData.$key)
    this.db.list('/teams').update($key, newTeamData);
  }

}
