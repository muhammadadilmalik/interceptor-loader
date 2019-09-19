import { Component, OnInit, OnDestroy } from '@angular/core';
import { loaderService } from 'service/loaderService';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponentComponent implements OnInit, OnDestroy {
  isLoadingVisible: boolean = false;

  constructor(private loaderService: loaderService) 
  { 
    this.loaderService.isLoading.subscribe(data=>{
      this.isLoadingVisible = data;
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.loaderService.isLoading.unsubscribe();
  }
}
