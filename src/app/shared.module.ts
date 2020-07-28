import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
