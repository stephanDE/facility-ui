import { Injectable } from '@angular/core';

export enum Environment {
  Prod = 'prod',
  Staging = 'test',
  Dev = 'dev',
  Local = 'local',
}

@Injectable({ providedIn: 'root' })
export class EnvService {
  private _env: Environment;
  private _apiUrl: string;

  get env(): Environment {
    return this._env;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  constructor() {}

  init(): Promise<void> {
    return new Promise(resolve => {
      this.setEnvVariables();
      resolve();
    });
  }

  private setEnvVariables(): void {
    const hostname = window && window.location && window.location.hostname;

    if (/^.*localhost.*/.test(hostname)) {
      this._env = Environment.Local;
      this._apiUrl = 'https://facility-api.dev.78.47.57.179.xip.io/api';
    } else if (/^facility-ui.dev/.test(hostname)) {
      this._env = Environment.Dev;
      this._apiUrl = 'https://facility-api.dev.78.47.57.179.xip.io/api';
    } else if (/^facility-ui.testing/.test(hostname)) {
      this._env = Environment.Staging;
      this._apiUrl = 'https://facility-api.testing.116.203.237.159.xip.io/api';
    } else if (/^facility-ui/.test(hostname)) {
      this._env = Environment.Prod;
      this._apiUrl = 'https://facility-api.116.203.237.159.xip.io/api';
    } else {
      console.warn(`Cannot find environment for host name ${hostname}`);
    }
  }
}