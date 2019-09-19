import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClient]
})
export class AppComponent implements OnInit {
  
  constructor(private _http: HttpClient) {
    this.loadContent();
  }

  ngOnInit() {
    console.log("component initialized...");
  }

  loadContent(){
    this._http.get("https://httpbin.org/get").subscribe(data=>{
      console.log(data);
    })
  }

  loadGoogle(){
    this._http.get("https://temp.com").subscribe(data=>{
      console.log(data);
    })
  }
}
