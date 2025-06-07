import * as assert from 'assert';
import { ValidationFramework } from '../validation/ValidationFramework';

suite('End-to-End Validation Suite', () => {
    
    test('Comprehensive extension validation', async function() {
        // Increase timeout for comprehensive validation
        this.timeout(30000);
        
        const results = await ValidationFramework.runFullValidation();
        
        // Assert that we have minimal failures
        assert.ok(results.failed <= 2, `Too many validation failures: ${results.failed}. Check detailed output.`);
        
        // Assert that we have some passing tests
        assert.ok(results.passed >= 10, `Not enough passing validations: ${results.passed}. Expected at least 10.`);
        
        // If there are failures, output them for debugging
        if (results.failed > 0) {
            const failedTests = ValidationFramework.getResults().filter(r => r.status === 'fail');
            console.log('\nFailed validations:');
            failedTests.forEach(test => {
                console.log(`  - ${test.test}: ${test.message}`);
            });
        }
        
        // Warnings are acceptable but should be logged
        if (results.warnings > 0) {
            const warnings = ValidationFramework.getResults().filter(r => r.status === 'warning');
            console.log('\nWarnings:');
            warnings.forEach(test => {
                console.log(`  - ${test.test}: ${test.message}`);
            });
        }
        
        console.log(`\nValidation Summary: ${results.passed} passed, ${results.failed} failed, ${results.warnings} warnings`);
    });
    
});