// Import required modules
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiUrl = 'https://www.googleapis.com/youtube/v3/search';
  channelId = 'UC1b8ISKuaJtaKwqDNlwUy7w'; // Your channel ID
  apiKey = 'AIzaSyCnX-Dynqr-peJdclUCgLDx5YUGRVwA3TE'; // Your YouTube Data API key

  constructor(private http: HttpClient) { }

  // Function to fetch videos from YouTube channel
  getVideos(): Observable<any> {
    const url = `${this.apiUrl}?channelId=${this.channelId}&part=snippet&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
