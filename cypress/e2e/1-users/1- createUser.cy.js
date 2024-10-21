/// <reference types="cypress" />

describe('Create User', () => {
  const user = {
    name: 'TestUser',
    email: 'testuser@example.com',
    password: 'password123'
  };

  it('should register a new user', () => {
    cy.visit('/register');
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User registered successfully');
    });

    // Verificar que el usuario puede iniciar sesión después de registrarse
    cy.visit('/login');
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Logged in successfully');
    });
  });
});