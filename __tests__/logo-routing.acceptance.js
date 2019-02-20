const { describe, it, before, after, afterEach, beforeEach } = require('mocha')
const { SERVER_URL, MAX_TIMEOUT } = require('./constants')
const pageObjects = require('./pageObjects')

describe('Test click logo in another page', () => {
  before((browser, done) => {
    done()
  })

  after((browser, done) => {
    browser.end(() => {
      done()
    })
  })

  afterEach((browser, done) => {
    done()
  })

  beforeEach((browser, done) => {
    done()
  })

  it('Check items in main page', browser => {
    browser
      .url(SERVER_URL)
      .expect.element('body').to.be.present.before(MAX_TIMEOUT)

    browser.assert.elementPresent(pageObjects.firstGameLink)
  })

  it('Click first link in game table', browser => {
    browser.click(pageObjects.firstGameLink)
    browser.assert.urlContains('/game/')
    browser.expect.element('body').to.be.present.before(MAX_TIMEOUT)
  })

  it('Find and click logo', browser => {
    browser.assert.elementPresent(pageObjects.logoLink)
    browser.click(pageObjects.logoLink)
    browser.assert.urlEquals(SERVER_URL)
  })

  it('Check items in main page again', browser => {
    browser.assert.elementPresent(pageObjects.firstGameLink)
  })
})
