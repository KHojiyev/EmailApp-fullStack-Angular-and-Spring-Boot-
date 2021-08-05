import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {RouterModule} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {MainComponent} from './main/main.component';
import {AuthGuard} from "./common/guard/auth.guard";
import {AuthService} from "./common/service/auth.service";
import {LogupComponent} from './logup/logup.component';
import {EmailService} from "./common/service/email.service";
import {MessageComponent} from './message/message.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {FormsModule} from "@angular/forms";
import { NewComponent } from './new/new.component';
import { SentComponent } from './sent/sent.component';
import { InboxComponent } from './inbox/inbox.component';
import { SettingComponent } from './setting/setting.component';
import { ComposeComponent } from './compose/compose.component';
import { CommonModule } from '@angular/common';
import { BinComponent } from './bin/bin.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    MainComponent,
    LogupComponent,
    MessageComponent,
    NewComponent,
    SentComponent,
    InboxComponent,
    SettingComponent,
    ComposeComponent,
    BinComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'inbox', component: InboxComponent,canActivate: [AuthGuard]},
      {path: 'bin', component: BinComponent,canActivate: [AuthGuard]},
      {path: 'setting', component: SettingComponent,canActivate: [AuthGuard]},
      {path: 'compose', component: ComposeComponent,canActivate: [AuthGuard]},
      {path: 'unread', component: NewComponent,canActivate: [AuthGuard]},
      {path: 'sent', component: SentComponent,canActivate: [AuthGuard]},
      {path: 'message', component: MessageComponent,canActivate: [AuthGuard]},
      {path: 'logUp', component: LogupComponent},
      {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
      {path: '', component: HomeComponent},

    ]),
    NgbModule
  ],
  providers: [AuthGuard, AuthService, EmailService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
