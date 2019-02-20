const { describe, it, before, after, afterEach, beforeEach } = require('mocha')
const { expect } = require('chai')
const { SERVER_URL, MAX_TIMEOUT, WAIT_DATALOAD } = require('./constants')


const pageObjects = require('./pageObjects')

describe('Test click categories', () => {
  let games = {}
  const clickGamblingTab = () => it('Click gambling tab', browser => {
    browser.click(pageObjects.categoryGamblingTabLink)
    browser.assert.urlContains('/gambling/')
    browser.expect.element('body').to.be.present.before(MAX_TIMEOUT)
    browser.pause(WAIT_DATALOAD)
  })

  const clickGamingTab = () => it('Click Gaming tab', browser => {
    browser.click(pageObjects.categoryGamingTabLink)
    browser.assert.urlContains('/')
    browser.expect.element('body').to.be.present.before(MAX_TIMEOUT)
    browser.pause(WAIT_DATALOAD)
  })

  const saveGameNames = category => {
    it(`Save ${category} game table item names`, (browser) => {
      games[category] = []
      browser.assert.elementPresent(pageObjects.gameTableItemName)
      browser.elements('css selector', pageObjects.gameTableItemName, result => {
        result.value.map(({ ELEMENT }) => {
          browser.elementIdText(ELEMENT, ({ value }) => {
            games[category].push(value)
          })
        })
      })
    })
  }

  const openMainPage = () => it('Open main page', browser => {
    browser
      .url(SERVER_URL)
      .expect.element('body').to.be.present.before(MAX_TIMEOUT)

    browser.assert.elementPresent(pageObjects.categoryGamingTabLink)
    browser.assert.elementPresent(pageObjects.categoryGamblingTabLink)
  })

  const checkGameNames = category => it(`Check ${category} game names`, browser => {
    browser.assert.elementPresent(pageObjects.gameTableItemName)
    browser.elements('css selector', pageObjects.gameTableItemName, result => {
      result.value.map(({ ELEMENT }) => {
        browser.elementIdText(ELEMENT, ({ value }) => {
          expect(games[category]).to.include(value)
        })
      })
    })
  })

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

  openMainPage()
  saveGameNames('gaming')
  clickGamblingTab()
  saveGameNames('gambling')

  it('Сomparison game names', browser => {
    // console.log(games)
    expect(games['gaming'][0]).not.to.be.equal(games['gambling'][0])
  })

  clickGamingTab()
  checkGameNames('gaming')
  clickGamblingTab()
  checkGameNames('gambling')
  openMainPage()
  checkGameNames('gaming')
})
