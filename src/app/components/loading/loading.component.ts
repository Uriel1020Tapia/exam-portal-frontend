import { Component, Input, OnInit, ViewChild, TemplateRef, ViewContainerRef, DoCheck, AfterViewInit } from '@angular/core';
import { OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { OverlayService } from './overlay/overlay.service';
import { SpinnerOverlayService } from 'src/app/services/spinner-overlay.service';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit,AfterViewInit {

   color?: ThemePalette = 'primary';
   diameter?: number = 100;
   mode?: ProgressSpinnerMode = 'indeterminate';
   strokeWidth?: number;
   value?: number = 50;
   backdropEnabled = true;
   positionGloballyCenter = true;
   displayProgressSpinner:boolean = false;


  @ViewChild('progressSpinnerRef')
  private progressSpinnerRef: TemplateRef<any>;
  private progressSpinnerOverlayConfig: OverlayConfig;
  private overlayRef: OverlayRef;
  constructor(private vcRef: ViewContainerRef, 
    private overlayService: OverlayService,
    private spinnerOverlaySvc:SpinnerOverlayService) { 

    }
  ngOnInit() {
    // Config for Overlay Service
    this.progressSpinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled
    };
    if (this.positionGloballyCenter) {
      this.progressSpinnerOverlayConfig['positionStrategy'] = this.overlayService.positionGloballyCenter();
    }
    this.overlayRef = this.overlayService.createOverlay(this.progressSpinnerOverlayConfig);
    
    // Create Overlay for progress spinner
    this.spinnerOverlaySvc.isLoading.subscribe((resp) => {
      console.log("isVisble",resp);

      if(resp){
        this.overlayService.attachTemplatePortal(this.overlayRef, this.progressSpinnerRef, this.vcRef);
      }else{
        this.overlayRef.detach();
      }
    });

  }
  ngDoCheck() {
      // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
      // if (this.displayProgressSpinner && !this.overlayRef.hasAttached()) {
      //   this.overlayService.attachTemplatePortal(this.overlayRef, this.progressSpinnerRef, this.vcRef);
      // } else if (!this.displayProgressSpinner && this.overlayRef.hasAttached()) {
      //   this.overlayRef.detach();
      // }
  }
  ngAfterViewInit() {

}
}
