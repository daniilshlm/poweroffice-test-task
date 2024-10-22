/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the correct heading', () => {
    cy.get('h1').should('contain.text', 'Company Search');
  });

  it('should display the theme toggle button', () => {
    cy.get('.theme-toggle-button').should('exist');
  });

  it('should have a search bar with input and button', () => {
    cy.get('input[type="text"]').should('have.attr', 'placeholder', 'Search by name...');
    cy.get('button').contains('Search').should('exist');
  });

  it('should display the company list', () => {
    cy.get('.company-list').should('exist');
  });

  it('should display pagination', () => {
    cy.get('.pagination').should('exist');
  });
});

