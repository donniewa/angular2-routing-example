/// <reference path="../tsd.d.ts" />

import { bootstrap } from 'angular2/angular2';
import { ROUTER_BINDINGS } from 'angular2/router';

import { App } from './app/app'

// Now pass the router bindings so we can use the router config later on
bootstrap(App, [ROUTER_BINDINGS]);