import { TestCaseTest } from '../src/was-run'

describe('creating xUnit with js', () => {
  test('should not throw an error', () => {
    expect(() => {
      new TestCaseTest('testSetup').run()
      new TestCaseTest('testTemplateMethod`').run()
    }).not.toThrow()
  })
})
