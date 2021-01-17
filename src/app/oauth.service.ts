import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const oauthConfig = {
  issuer: 'https://github.com/login/oauth/authorize',
  clientId: 'Iv1.a806bf4ed53a30ef'
};

@Injectable()
export class OauthService {

  constructor(private http: HttpClient) {
  }

  public redirectOauthPage() {
    window.location.href = `${oauthConfig.issuer}?client_id=${oauthConfig.clientId}&login=kherrisan`;
  }
}
