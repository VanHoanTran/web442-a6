import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> = [];
  private favouritesSub: any;
  constructor(private musicDataService: MusicDataService) { }

  ngOnInit() {
    this.favouritesSub = this.musicDataService
      .getFavourites()
      .subscribe((data) => {
        this.favourites = data.tracks;
      });
  }

  removeFromFavourites(trackID: string) {
    this.musicDataService.removeFromFavourites(trackID).subscribe((data) => (this.favourites = data.tracks));
  }
  
  ngOnDestroy(): void {
      this.favouritesSub?.unsubscribe();
  }
}
