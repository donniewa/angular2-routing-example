/// <reference path="../../tsd.d.ts" />

import { Component, View } from 'angular2/angular2'
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router'

import { Home } from '../home/home'
import { Test } from '../home/test'


import {MdButton} from 'angular2_material/material';


@Component ({
    selector : "app"
})

@View ({
    template : `
    <md-toolbar layout="row">
        <h1>Welcome</h1>
        <ul>
            <li><a [router-link]="['/home']">Home</a></li>
            <li><a [router-link]="['/test']">Test Page</a></li>
        </ul>
    </md-toolbar>
    <div layout="row" flex>
        <router-outlet></router-outlet>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', component: Home, as: "home" }
    { path: '/The.Url.Can.Be.Anything!', component: Test, as: "test" }
])

export class App {
}