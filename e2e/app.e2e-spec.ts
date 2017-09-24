import { RecipiesPage } from './app.po';

describe('recipies App', () => {
  let page: RecipiesPage;

  beforeEach(() => {
    page = new RecipiesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
