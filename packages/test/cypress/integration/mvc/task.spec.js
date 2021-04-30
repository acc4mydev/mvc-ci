/// <reference types="cypress" />

context('Actions', () => {
  it('creates task', () => {
    cy.intercept('GET', '**/task/*').as('getTask');
    cy.visit('http://localhost:8030/task/add');
    cy.get('[name="title"]').type('task 1');
    cy.get('[name="content"]').type('do whatever');
    cy.get('[type="submit"]').click();
    cy.wait('@getTask').its('response.statusCode').should('be.oneOf', [200]);
    cy.get('.task').last().find('.title h4').should('have.text', 'task 1');
  });
});
