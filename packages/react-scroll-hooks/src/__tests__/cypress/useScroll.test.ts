/// <reference types="cypress" />

context('Scrolling', () => {
  beforeEach(() => {
    cy.visit('iframe.html?id=react-scroll-hooks-usescroll--container-example');
  });

  it('SHOULD scroll to the correct Y position', () => {
    cy.get('.scroll-to-second-element')
      .click()
      .get('.container')
      .invoke('scrollTop')
      .should('be.equal', 500);
  });

  it('SHOULD scroll to bottom of container and then allow to scroll back to top', () => {
    cy.get('.scroll-to-last-element')
      .click()
      .get('.container')
      .invoke('scrollTop')
      .should('be.equal', 1900);

    cy.get('.scroll-to-y0')
      .click()
      .get('.container')
      .invoke('scrollTop')
      .should('be.equal', 0);
  });

  it('SHOULD allow user to cancel scrolling when users scrolls in opposite direction', () => {
    cy.get('.scroll-to-last-element')
      .click()
      .get('.container')
      .scrollTo('top')
      .invoke('scrollTop')
      .should('be.equal', 0);
  });

  it('SHOULD allow user to scroll to an element, then away from it and then trigger scroll back to it', () => {
    cy.get('.scroll-to-last-element')
      .click()
      .get('.container')
      .scrollTo('top')
      .get('.scroll-to-last-element')
      .click()
      .invoke('scrollTop')
      .should('be.equal', 0);
  });
});
