import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css'],
})
export class SearchresultsComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: string = '';
  private resultsSub: any;
  private searchQuerySub: any;
  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  ngOnInit(): void {
    this.resultsSub = this.route.queryParams.subscribe((pram) => {
      this.searchQuery = pram['q'];
      this.searchQuerySub = this.data
        .searchArtists(this.searchQuery)
        .subscribe((data) => {
          this.results = data.artists.items.filter(
            (result) => result.images.length > 0
          );
        });
    });
  }

  ngOnDestroy() {
    this.searchQuerySub?.unsubscribe();
    this.resultsSub?.unsubscribe();
  }
}
