import * as env from '../../src/utils/env'

/*
  This is the most basic configuration so please
  threat the below tests as placeholders
*/

function mockAgentEndpoints(url) {
  cy.intercept(
    {
      method: 'GET',
      url: `${url}/status?`,
    },
    { fixture: 'agent-status.json' }
  ).as('agentStatus')
}

describe('Integration tests for Authority UI', () => {
  const url = env.AUTHORITY_ORIGIN
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })
  beforeEach(() => {
    mockAgentEndpoints(url)
  })

  describe('connection to an agent', () => {
    beforeEach(() => {
      cy.visit('/')
    })
    describe('if agent does not respond', () => {
      it('renders a modal along with the error message', () => {
        cy.intercept('GET', `${url}/status?`, { forceNetworkError: true }).as(
          'agentStatusErr'
        )
        cy.get('[data-cy=switch-to-custom-endpoint]').click()
        cy.wait('@agentStatusErr').should('have.property', 'error')
      })
    })
    it('renders DOM', () => cy.get('#root').should('exist'))
    it("retrieves agent's status from '/status?' endpoint", () => {
      cy.get('[data-cy=switch-to-custom-endpoint]').click()
      cy.wait('@agentStatus').then(({ response }) => {
        assert.equal(response.statusCode, 200)
      })
    })
  })
})
