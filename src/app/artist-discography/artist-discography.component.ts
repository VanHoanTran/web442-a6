import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  id: any = {};
  artist: any = {};
  albums: any = {};

  private IDsub: any;
  private artistSub: any;
  private albumsSub: any;
  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit(): void {
    this.IDsub = this.route.paramMap.subscribe((p) => {
      this.id = p.get('id');
    });

    this.artistSub = this.data
      .getArtistById(this.id)
      .subscribe((data) => (this.artist = data));

    this.albums = this.data.getAlbumsByArtistId(this.id).subscribe((data) => {
      console.log(data.items);
      this.albums = data.items.filter(
        (curValue, index, self) =>
          self.findIndex(
            (item) => item.name.toUpperCase() === curValue.name.toUpperCase()
          ) === index
      );
    });
  }

  ngOnDestroy() {
    this.IDsub?.unsubscribe();
    this.artistSub?.unsubscribe();
    this.albumsSub?.unsubscribe();
  }
}
