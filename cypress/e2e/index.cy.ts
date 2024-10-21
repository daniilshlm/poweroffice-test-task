/// <reference types="cypress" />

describe('Main Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the correct heading', () => {
    cy.get('h1').should('contain.text', 'Welcome to the Home Page');
  });
});
