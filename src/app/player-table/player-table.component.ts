import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {
   public players$!: Observable<Player[]>;
   public selectedPlayer!: Player;

   public showModal = false;

  constructor(private playerService: PlayerService) { }

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

}
