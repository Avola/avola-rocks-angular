import { AvolaRocksPage } from './app.po';

describe('avola-rocks App', () => {
  let page: AvolaRocksPage;

  beforeEach(() => {
    page = new AvolaRocksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
