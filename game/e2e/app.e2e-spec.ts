import {GamePage} from './app.po';

describe('game App', () => {
  let page: GamePage;

  beforeEach(() => {
    page = new GamePage();
  });

  // *Intro Page*

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

  it('should navigate to game page after New Game button click', () => {
    page.navigateTo('/intro');
    page.clickNewGameBtn()
      .then(() => page.getCurrentUrl())
      .then(url => {
        expect(url).toEqual(page.getBaseUrl() + '/game');
      });
  });

  // *404 Page*

  it('should display 404 text', () => {
    page.navigateTo('/dsfsdf');
    page.getNotFoundText().then((title) => {
      expect(title).toBe('404, page not found');
    });
  });

  it('should display Go to the main page link', () => {
    page.navigateTo('/dsfsdf');
    page.getHomeLinkText().then((title) => {
      expect(title).toBe('Go to the main page');
    });
  });

  it('should navigate to home page after Go to the main page link click', () => {
    page.navigateTo('/404');
    page.clickHomeLink()
      .then(() => page.getCurrentUrl())
      .then(url => {
        expect(url).toEqual(page.getBaseUrl() + '/intro');
      });
  });

  // *Winner Page*

  it('should display New Game button', () => {
    page.navigateTo('/winner/name');
    page.getStartNewGameBtnText().then((title) => {
      expect(title).toBe('New Game');
    });
  });

  it('should display Winner name text', () => {
    const winnerName = 'Bob';

    page.navigateTo(`/winner/${winnerName}`);

    page.getWinnerText().then((title) => {
      expect(title).toBe('Bob won!');
    });
  });

  it('should navigate to game page after New Game button click', () => {
    page.navigateTo('/winner/name');
    page.clickNewGameBtn()
      .then(() => page.getCurrentUrl())
      .then(url => {
        expect(url).toEqual(page.getBaseUrl() + '/game');
      });
  });

  // *Game Page*

  it('should display New Game button', () => {
    page.navigateTo('/game');
    page.getPlaceShipsBtnText().then((title) => {
      expect(title).toBe('Place Ships');
    });
  });

  it('should display Exit button', () => {
    page.navigateTo('/game');
    page.getExitBtnText().then((title) => {
      expect(title).toBe('Exit');
    });
  });

  it('should display Welcome console text', () => {
    const welcomeText = 'Please place your ships on the game battle field. The Game will start immediately after all ship\'s positioning.';

    page.navigateTo('/game');
    page.getConsoleWelcomeText().then((text) => {
      expect(text).toBe(welcomeText);
    });
  });

  it('should navigate to intro page after Exit button click', () => {
    page.navigateTo('/game');
    page.clickExitBtn()
      .then(() => page.getCurrentUrl())
      .then(url => {
        expect(url).toEqual(page.getBaseUrl() + '/intro');
      });
  });

  it('should display Random Rotate after Place Ships button click', () => {
    page.navigateTo('/game');
    page.clickPlaceShipsBtn()
      .then(() => page.getRandomRotationBtnText())
      .then((text) => {
        expect(text).toBe('Random Rotation');
      });
  });

  it('should display new text instruction after Place Ships button click', () => {
    const newGameInstruction = 'Use the mouse to place your ships on the battle field.';

    page.navigateTo('/game');
    page.clickPlaceShipsBtn()
      .then(() => page.getConsoleWelcomeText())
      .then((text) => {
        expect(text).toBe(newGameInstruction);
      });
  });

  it('should place player ship', () => {
    page.navigateTo('/game');
    page.clickPlaceShipsBtn()
      .then(() => page.setShipPlayerGrid())
      .then(() => page.getPlayerShip())
      .then(cssClass => {
        expect(cssClass).toContain('ship');
      });
  });

  it('should not be able to place player ship on existing ship position', () => {
    const newGameInstruction = 'iShape can not be placed on this position';

    page.navigateTo('/game');
    page.clickPlaceShipsBtn()
      .then(() => page.clickGridPosition1())
      .then(() => page.clickGridPosition1())
      .then(() => page.getConsoleWelcomeText())
      .then((text) => {
        expect(text).toBe(newGameInstruction);
      });
  });

  it('should place players fleet', () => {
    const newGameInstruction = 'Player can select sector to attack bots Fleet.';

    page.navigateTo('/game');
    page.clickPlaceShipsBtn().then(() => {
      page.clickGridPosition1()
        .then(() => page.clickGridPosition4())
        .then(() => page.clickGridPosition6())
        .then(() => page.clickGridPosition8())
        .then(() => page.getConsoleWelcomeText())
        .then((text) => {
          expect(text).toBe(newGameInstruction);
        });
    });
  });

  it('should be able to make a shot', () => {
    const miss = 'Miss';

    page.navigateTo('/game');
    page.clickPlaceShipsBtn().then(() => {
      page.clickGridPosition1()
        .then(() => page.clickGridPosition4())
        .then(() => page.clickGridPosition6())
        .then(() => page.clickGridPosition8())
        .then(() => page.clickBotGridPosition8())
        .then(() => page.getConsoleWelcomeText())
        .then((text) => {
          expect(text).toBe(miss);
        });
    });
  });
});
