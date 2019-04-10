const {lint, extendDefaultConfig} = require('./utils')

describe('primer/no-override', () => {
  it('reports instances of utility classes', () => {
    return lint('.text-gray { color: #111; }').then(data => {
      expect(data).toHaveErrored()
      expect(data).toHaveWarningsLength(1)
      expect(data).toHaveWarnings([`The selector ".text-gray" should not be overridden. (primer/no-override)`])
    })
  })

  it('reports instances of complete utility selectors', () => {
    const selector = '.show-on-focus:focus'
    return lint(`${selector} { color: #f00; }`).then(data => {
      expect(data).toHaveErrored()
      expect(data).toHaveWarningsLength(1)
      expect(data).toHaveWarnings([`The selector "${selector}" should not be overridden. (primer/no-override)`])
    })
  })

  it('reports instances of partial utility selectors', () => {
    const selector = '.show-on-focus'
    return lint(`.foo ${selector}:focus { color: #f00; }`).then(data => {
      expect(data).toHaveErrored()
      expect(data).toHaveWarningsLength(1)
      expect(data).toHaveWarnings([`The selector "${selector}" should not be overridden. (primer/no-override)`])
    })
  })

  it('warns when you pass an invalid bundle name', () => {
    const config = extendDefaultConfig({
      rules: {
        'primer/no-override': [true, {bundles: ['asdf']}]
      }
    })
    return lint('', config).then(data => {
      expect(data).not.toHaveErrored()
      expect(data.results[0].invalidOptionWarnings).toHaveLength(1)
    })
  })
})
