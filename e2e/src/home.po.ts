import { browser, by, element } from 'protractor';
import { UrlsService } from 'src/app/home/core/urls.service';

export class HomePage {

    navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl + '/home') as Promise<unknown>;
    }

    getTitleText(): Promise<string> {
        // return element(by.css('app-root .content span')).getText() as Promise<string>;
        return element(by.className('version')).getText() as Promise<string>;
    }


}
