import { GamePage } from './app.po';

describe('game App', () => {
  let page: GamePage;

  beforeEach(() => {
    page = new GamePage();
  });

  it('should display title saying Battle ship', () => {
    page.navigateTo('/');
    page.getStartGameTitle().then((title) => {
      expect(title).toBe('Battle ship');
    });
  });

  it('should display game intro text', () => {
    const gameIntroText = 'You are going to play a good old school battle ship game against a simple bot.';

    page.navigateTo('/');
    page.getStartGameText().then((title) => {
      expect(title).toBe(gameIntroText);
    });
  });

  it('should display New Game button', () => {
    page.navigateTo('/');
    page.getStartNewGameBtnText().then((title) => {
      expect(title).toBe('New Game');
    });
  });
});
