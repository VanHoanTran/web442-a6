import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  id: any;
  album: SpotifyApi.ArtistsAlbumsResponse | any;
  private albumsSub: any;

  constructor(
    private route: ActivatedRoute,
    private data: MusicDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((p) => {
      this.id = p.get('id');
    });

    this.albumsSub = this.data
      .getAlbumById(this.id)
      .subscribe((data) => (this.album = data));
  }

  addToFavourites(trackID: any) {
    this.data.addToFavourites(trackID).subscribe(
      (success) => {
        this.snackBar.open(
          'Adding to Favourites...',
          'Done',
          {
            duration: 1500,
          }
        );
      },
    );
  }

  ngOnDestroy() {
    this.albumsSub?.unsubscribe();
  }
}
