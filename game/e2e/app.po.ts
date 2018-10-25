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
}
