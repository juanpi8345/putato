import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContadorReversaComponent } from './contador-reversa.component';

@NgModule({
  declarations: [ContadorReversaComponent],
  imports: [CommonModule],
  exports: [ContadorReversaComponent],
})
export class ContadorReversaModule {}
