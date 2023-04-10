import assert from 'assert'

class TestCase {
  [key: string]: unknown
  name: string
  log = ''
  constructor(name: string) {
    this.name = name
  }

  run() {
    this.setup()
    const method = (this[this.name] as CallableFunction).bind(this)
    method()
  }

  setup() {
    /** */
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
}

export class TestCaseTest extends TestCase {
  test: WasRun | undefined

  testSetup() {
    this.test = new WasRun('testMethod')
    this.test.run()
    assert(this.test.log === 'setup testMethod ')
  }

  testTemplateMethod() {
    this.test = new WasRun('testMethod')
    this.test.run()
    assert(this.test.log === 'setup testMethod tearDown ')
  }
}
