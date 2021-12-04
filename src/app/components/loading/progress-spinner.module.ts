import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingComponent } from './loading.component';
import { SpinnerOverlayService } from 'src/app/services/spinner-overlay.service';
import { AppOverlayModule } from './overlay/overlay.module';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    AppOverlayModule,
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})
export class ProgressSpinnerModule { }