import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../service/song/song.service';
import {PlaymusicService} from '../../../service/playmusic.service';
import {ThemeService} from '../../../service/theme.service';
import {GenreService} from '../../../service/genre.service';
import {CountryService} from '../../../service/country.service';
import {Theme} from '../../../interface/theme';
import {Genre} from '../../../interface/genre';
import {Country} from '../../../interface/country';
import {Song} from '../../../interface/song';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {TokenServiceService} from '../../../service/token/token-service.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  public themes: Theme[];
  public themeHtml: string;
  public genres: Genre[];
  public genreHtml: string;
  public countries: Country[];
  public countryHtml: string;
  public currentUser: any = null;
  public songs: Song[] = [];
  song: Song = {};

  constructor(private songService: SongService,
              private playService: PlaymusicService,
              private themeService: ThemeService,
              private genreService: GenreService,
              private countryService: CountryService,
              private token: TokenServiceService) {
  }

  ngOnInit() {
    this.themeService.getAllTheme().subscribe(themes => {
      this.themes = themes;
      for (const theme of themes) {
        this.themeHtml += `<option value="${theme.id}">${theme.name}</option>`;
      }
    });
    this.genreService.getAllGenre().subscribe(genres => {
      this.genres = genres;
      for (const genre of genres) {
        this.genreHtml += `<option value="${genre.id}">${genre.name}</option>`;
      }
    });
    this.countryService.getAllCountry().subscribe(countries => {
      this.countries = countries;
      for (const country of countries) {
        this.countryHtml += `<option value="${country.id}">${country.name}</option>`;
      }
    });
    this.currentUser = this.token.getUser();
    if (this.currentUser == null) {

    } else {
      this.getAllSong(this.currentUser.id);
    }
  }

  playmusic(id: number) {
    this.songService.findById(id).subscribe(song => {
      this.playService.playsong(song);
    });
  }

  public getAllSong(id: number): void {
    this.songService.getAllSongByUserId(id).subscribe(
      (response: Song[]) => {
        this.songs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteSong(id: number): void {
    this.songService.deleteSong(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllSong(this.currentUser.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public upDateSong(song: Song): void {
    this.songService.editSong(song).subscribe(
      (response: Song) => {
        console.log(response);
        this.getAllSong(this.currentUser.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteConfirm(song: Song): void {
    Swal.fire({
      title: `Are you sure want to remove ${song.name}?`,
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.deleteSong(song.id);
        Swal.fire(
          'Deleted!',
          'Your music file has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your music file is safe :)',
          'error'
        );
      }
    });
  }

  public async showUpdateForm(id: number) {
    let updateSong: Song = {};
    this.songService.findById(id).subscribe(song => {
      updateSong = song;
      Swal.fire({
        title: `Update Song`,
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, keep it',
        html:
          `<table>
            <tr>
              <td><label>Song Title *</label></td>
              <td><input class="swal2-input" id="name" value="${song.name}"><br></td>
            </tr>
            <tr>
              <td><label>Genre</label></td>
              <td><select class="swal2-select" id="genre" style="float:left">
                       <option selected value="${song.genre.id}">${song.genre.name}</option>
                       ${this.genreHtml}
                       </select></td>
            </tr>
            <tr>
              <td><label>Theme</label></td>
              <td><select class="swal2-select" id="theme" style="float:left">
                       <option selected value="${song.theme.id}">${song.theme.name}</option>
                       ${this.themeHtml}
                       </select></td>
            </tr>
            <tr>
              <td><label>Country</label></td>
              <td><select class="swal2-select" id="country" style="float:left">
                       <option selected value="${song.country.id}">${song.country.name}</option>
                       ${this.countryHtml}
                       </select></td>
            </tr>
            <tr>
              <td><label>Lyrics</label></td>
              <td><textarea class="swal2-input" id="lyrics" class="swal2-textarea">"${song.lyrics}"</textarea></td>
            </tr>
            </table>`,
        preConfirm: () => {
          return [
            // @ts-ignore
            document.getElementById('name').value,
            // @ts-ignore
            document.getElementById('genre').value,
            // @ts-ignore
            document.getElementById('theme').value,
            // @ts-ignore
            document.getElementById('country').value,
            // @ts-ignore
            document.getElementById('lyrics').value,
          ];
        }
      }).then(async (result) => {
        if (result.value) {
          updateSong.name = result.value[0];
          updateSong.genre = {
            id: result.value[1]
          };
          updateSong.theme = {
            id: result.value[2]
          };
          updateSong.country = {
            id: result.value[3]
          };
          updateSong.lyrics = result.value[4];

          await this.upDateSong(updateSong);
          Swal.fire(
            'Updated!',
            'Your music file has been updated.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your music file is safe :)',
            'error'
          );
        }
      });
    });
  }
}
