import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Country } from '../interfaces/player';
import { Team } from '../interfaces/team';
import { TeamService, TeamTableHeaders } from '../services/team.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss'],
})
export class TeamTableComponent implements OnInit {
  public teams$!: Observable<Team[]>;
  public tableHeaders = TeamTableHeaders;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams();

    // Obtenemos el Equipo y solo tomamos un resultado
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length === 0) {
          const team: Team = {
            name: 'MyAmazingTeam',
            country: Country.Mexico,
            players: [],
          };
          // Agregamos a la base de datos
          this.teamService.addTeam(team);
        }
      });
  }
}
