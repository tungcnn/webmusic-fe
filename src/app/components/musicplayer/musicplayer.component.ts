import {Component, OnChanges, OnInit} from '@angular/core';
import {Song} from "../../interface/song";
import {PlaymusicService} from "../../service/playmusic.service";


@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.css']
})
export class MusicplayerComponent implements OnInit {
  song: Song = {
    id: 1,
    name: 'Trốn tìm',
    filename: 'https://firebasestorage.googleapis.com/v0/b/webmusic-cc387.appspot.com/o/Tron%20Tim%20-%20Den_%20MTV.mp3?alt=media&token=0bd5e513-15b3-4486-9bc9-36e8fd6438ac',
    singers: [{
      id: 1,
      name: 'Đen Vâu'
    }]
  };
  constructor(private playmusic: PlaymusicService) { }

  ngOnInit() {
    this.playmusic.playsong(this.song);
  }
}
