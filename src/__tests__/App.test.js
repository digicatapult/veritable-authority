import React from 'react'
import { mount } from '@cypress/react'
import App from '../components/Core/AppCore'

describe('App.js', () => {
  beforeEach(() => {
    mount(<App />)
  })

  it('renders App component', () => {
    cy.get('[data-cy=app-core]').should('exist').contains('Authority')
  })
})
