import { TestCaseTest, TestResult, TestSuite } from './was-run'

const suite = new TestSuite()
suite.add(new TestCaseTest('testTemplateMethod'))
suite.add(new TestCaseTest('testResult'))
suite.add(new TestCaseTest('testSuite'))
suite.add(new TestCaseTest('testFailedResult'))
const result = new TestResult()
suite.run(result)
console.log(result.summary())
