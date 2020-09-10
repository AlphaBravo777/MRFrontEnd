import { browser, logging } from 'protractor';
import { HomePage } from './home.po';

describe('workspace-project HomePage', () => {
    let page: HomePage;

    beforeEach(() => {
        page = new HomePage();
    });

    it('should display current version', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('You are running v2.0.6');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
