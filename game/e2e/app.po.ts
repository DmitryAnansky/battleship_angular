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

  getRandomRotationBtnText() {
    return this.getElementText('.random-rotation-btn');
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

  clickPlaceShipsBtn() {
    return element(by.css('.place-ship-btn')).click();
  }

  setShipPlayerGrid() {
    return element(by.css('.bottom .grid .points')).click();
  }

  clickGridPosition1() {
    return element(by.css('.bottom .shipN1')).click();
  }

  clickGridPosition4() {
    return element(by.css('.bottom .shipN4')).click();
  }

  clickGridPosition6() {
    return element(by.css('.bottom .shipN6')).click();
  }

  clickGridPosition8() {
    return element(by.css('.bottom .shipN8')).click();
  }

  clickBotGridPosition8() {
    return element(by.css('.top .shipN8')).click();
  }

  getPlayerShip() {
    return element(by.css('.bottom .points.ship')).getAttribute('class');
  }

  getCurrentUrl() {
    return browser.getCurrentUrl();
  }

  getBaseUrl() {
    return browser.baseUrl;
  }
}
