import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {
   public players$!: Observable<Player[]>;
   public selectedPlayer!: Player;

   public showModal = false;

  constructor(private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.players$ = this.playerService.getPlayers(); // Obtenemos la coleccion de jugadores
  }

  newPlayer() {
    this.showModal = true;
    this.selectedPlayer;

    setTimeout(() => {
      // Llamamos al modal por medio de su nombre que esta en player-dialog.component.html
      window.location.replace('#open-modal');
    });
  }

  editPlayer(player: Player) {
    this.selectedPlayer = { ...player };
    this.showModal = true;
    setTimeout(() => {
      window.location.replace('#open-modal');
    });
  }

  deletePlayer(player: Player) {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams => {
        const moddifiedPlayers = teams[0].players ? teams[0].players.filter((p: any) => p.key !== player.$key) : teams[0].players;
        const formattedTeam = {
          ...teams[0],
          players: [...moddifiedPlayers]
        };
        this.playerService.deletePlayer( player.$key as any);
        this.teamService.editTeam(formattedTeam);
      });
  }

  // Cerrar Modal
  closeDialog() {
    this.showModal = false;
  }

}
