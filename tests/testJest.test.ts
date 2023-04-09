import { TestCaseTest, WasRun } from '../src/was-run'

describe('creating xUnit with js', () => {
  test('should set wasRun instance variable to true when test is run', () => {
    const test = new WasRun('testMethod')
    console.log(test.wasRun)
    expect(test.wasRun).toBeFalsy()
    test.run()
    expect(test.wasRun).toBeTruthy()
  })

  test('should not throw an error', () => {
    expect(() => {
      new TestCaseTest('testRunning').run()
      new TestCaseTest('testSetup').run()
    }).not.toThrow()
  })
})
