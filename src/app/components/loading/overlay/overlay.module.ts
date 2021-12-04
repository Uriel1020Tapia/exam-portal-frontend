import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { SpinnerOverlayService } from 'src/app/services/spinner-overlay.service';
import { OverlayService } from './overlay.service';

// import { OverlayService,  } from './overlay.service';
// export { OverlayService,  } from './overlay.service';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  providers: [OverlayService],
})
export class AppOverlayModule { }