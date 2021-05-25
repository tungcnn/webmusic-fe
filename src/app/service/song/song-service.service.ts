import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Song} from '../../interface/song';

@Injectable({providedIn: 'root'})
export class SongServiceService {
  private apiSongServiceUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAllSong(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiSongServiceUrl}/songs/all`);
  }

  public getAllSongByUserId(id: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiSongServiceUrl}/songs/all/${id}`);
  }

  public findById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.apiSongServiceUrl}/songs/${id}`);
  }

  public addSong(newSong: Song): Observable<Song> {
    return this.http.post<Song>(`${this.apiSongServiceUrl}/songs/add`, newSong);
  }

  public editSong(editSong: Song): Observable<Song> {
    return this.http.put<Song>(`${this.apiSongServiceUrl}/songs/edit`, editSong);
  }

  public deleteSong(idSong: number): Observable<void> {
    return this.http.delete<void>(`${this.apiSongServiceUrl}/songs/delete/${idSong}`);
  }

  public findByName(name: Song): Observable<Song[]> {
    return this.http.post<Song[]>(`${this.apiSongServiceUrl}/songs/search`, name);
  }
  public getTop15(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiSongServiceUrl}/songs/top15`);
  }
  public getLatestSong(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiSongServiceUrl}/songs/latest`);
  }
}
