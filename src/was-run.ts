import assert from 'assert'

class TestCase {
  [key: string]: any
  name: string
  wasSetup: boolean
  constructor(name: string) {
    this.wasSetup = false
    this.name = name
  }

  run() {
    this.setup()
    const method = this[this.name].bind(this)
    method()
  }

  setup() {
    this.wasSetup = true
  }
}

export class WasRun extends TestCase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wasRun: boolean
  constructor(name: string) {
    super(name)
    this.wasRun = false
  }

  testMethod() {
    this.wasRun = true
  }
}

export class TestCaseTest extends TestCase {
  setup() {
    this.test = new WasRun('testMethod')
  }

  testSetup() {
    this.test.run()
    assert(this.test.wasSetup)
  }

  testRunning() {
    assert(!this.test.wasRun)
    this.test.run()
    assert(this.test.wasRun)
  }
}
