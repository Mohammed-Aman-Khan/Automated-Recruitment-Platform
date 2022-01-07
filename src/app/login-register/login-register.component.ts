import { Component, OnInit } from '@angular/core'
import { ElectronService } from '../core/services'
import { TranslateService } from '@ngx-translate/core'
import { APP_CONFIG } from '../../environments/environment'

@Component({
    selector: 'app-login-register',
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {

    constructor(
        private electronService: ElectronService,
        private translate: TranslateService
    ) {
        // if (localStorage.loggedIn) {
        //     location.replace('/dashboard')
        // }
    }

    ngOnInit(): void {
    }

}
