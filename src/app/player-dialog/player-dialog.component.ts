import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Country, Player, SquadNumber } from '../interfaces/player';
import { Team } from '../interfaces/team';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss']
})
export class PlayerDialogComponent implements OnInit {

  private team!: Team;
  public player!: Player;
  public countries = Object.keys(Country).map(key => ({ label: key, key: (Country as any)[key]}));
  public squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map(key => ({
      label: key,
      key: SquadNumber[key as any]
    }));

  constructor(private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams => {
        if (teams.length > 0) {
          this.team = teams[0];
        }
      });
  }

  private newPlayer(playerFormValue: any) {
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKey = {
      ...playerFormValue,
      key
    };
    const formattedTeam = {
      ...this.team,
      players: [...(this.team.players ? this.team.players : []), playerFormValueKey]
    };

    this.teamService.editTeam(formattedTeam);
  }

  onSubmit(playerForm: NgForm) {
    const playerFormValue = {...playerForm.value};
    if (playerForm.valid) {
      playerFormValue.leftFooted = playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }
    this.newPlayer(playerFormValue);
    window.location.replace('#');
  }

}
