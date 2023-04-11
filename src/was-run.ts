import assert from 'assert'

class TestCase {
  [key: string]: unknown
  name: string
  log = ''
  constructor(name: string) {
    this.name = name
  }

  run(result: TestResult) {
    result.testStarted()
    this.setup()
    try {
      const method = (this[this.name] as CallableFunction).bind(this)
      method()
    } catch (error) {
      result.testFailed()
    }
    this.tearDown()
    return result
  }

  setup() {
    /** */
  }

  tearDown() {
    /**= */
  }
}

export class WasRun extends TestCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wasRun: boolean
  constructor(name: string) {
    super(name)
    this.wasRun = false
  }

  setup(): void {
    this.wasRun = false
    this.log = 'setup '
  }

  testMethod() {
    this.wasRun = true
    this.log = this.log + 'testMethod '
    /** */
  }

  testBrokenMethod() {
    throw new Error('')
  }

  tearDown() {
    this.log = this.log + 'tearDown '
  }
}

export class TestResult {
  ranCount: number
  errorCount: number
  constructor() {
    this.ranCount = 0
    this.errorCount = 0
  }

  testStarted() {
    this.ranCount += 1
  }

  testFailed() {
    this.errorCount += 1
  }

  summary() {
    return `${this.ranCount} run, ${this.errorCount} failed`
  }
}

export class TestSuite {
  tests: TestCase[] = []

  add(test: TestCase) {
    this.tests.push(test)
  }

  run(result: TestResult) {
    this.tests.forEach((test) => test.run(result))
    return result
  }
}

export class TestCaseTest extends TestCase {
  test: WasRun | undefined
  result!: TestResult

  setup(): void {
    this.result = new TestResult()
  }

  testSetup() {
    this.test = new WasRun('testMethod')
    assert(this.test.log === 'setup testMethod ')
  }

  testTemplateMethod() {
    this.test = new WasRun('testMethod')

    this.test.run(this.result)
    assert(this.test.log === 'setup testMethod tearDown ')
  }

  testResult() {
    const test = new WasRun('testMethod')

    test.run(this.result)
    assert(this.result.summary() === '1 run, 0 failed')
  }

  testBrokenMethod() {
    const test = new WasRun('testBrokenMethod')

    test.run(this.result)
    assert(this.result.summary() === '1 run, 1 failed')
  }

  testFailedResultFormatting() {
    this.result.testStarted()
    this.result.testFailed()
    assert(this.result.summary() === '1 run, 1 failed')
  }

  testSuite() {
    const suite = new TestSuite()
    suite.add(new WasRun('testMethod'))
    suite.add(new WasRun('testBrokenMethod'))

    suite.run(this.result)
    assert('2 run, 1 failed' === this.result.summary())
  }
}
