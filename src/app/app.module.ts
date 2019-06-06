import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColorGithubModule } from 'ngx-color/github'; 
import { MatDialogModule } from '@angular/material';
import { DialogComponent } from './post/dialog/dialog.component';
import { A11yModule } from '@angular/cdk/a11y';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import { ConfirmDialogComponent } from './post/confirm-dialog/confirm-dialog.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SortPipe } from './pipe/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    DialogComponent,
    ConfirmDialogComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ColorGithubModule,
    MatDialogModule,
    A11yModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  entryComponents: [DialogComponent, ConfirmDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
