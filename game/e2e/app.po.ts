import { browser, element, by } from 'protractor';

export class GamePage {
  navigateTo(url: string) {
    return browser.get(url);
  }

  getElementText(query: string) {
    return element(by.css(query)).getText();
  }

  getStartGameTitle() {
    return this.getElementText('.card-body h5');
  }

  getStartGameText() {
    return this.getElementText('.card-body .card-text');
  }

  getStartNewGameBtnText() {
    return this.getElementText('.card-body .btn-dark');
  }

  getPlaceShipsBtnText() {
    return this.getElementText('.control-panel .place-ship-btn');
  }

  getExitBtnText() {
    return this.getElementText('.control-panel .exit-btn');
  }

  getConsoleWelcomeText() {
    return this.getElementText('.progress-info .game-progress-log');
  }

  getNotFoundText() {
    return this.getElementText('.not-found-page h1');
  }

  getWinnerText() {
    return this.getElementText('.winner-page-container .card-title');
  }

  getHomeLinkText() {
    return this.getElementText('.home-link');
  }

  clickHomeLink() {
    return element(by.css('.home-link')).click();
  }

  clickNewGameBtn() {
    return element(by.css('.card-body .btn-dark')).click();
  }

  clickExitBtn() {
    return element(by.css('.exit-btn')).click();
  }

  getCurrentUrl() {
    return browser.getCurrentUrl();
  }

  getBaseUrl() {
    return browser.baseUrl;
  }
}
