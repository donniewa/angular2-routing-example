/// <reference path="../../tsd.d.ts" />

import { Component, View } from 'angular2/angular2'
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router'

import { Home } from '../home/home'

@Component ({
    selector : "app"
})

@View ({
    template : `<h1>Welcome</h1><router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', component: Home }
])

export class App {
}