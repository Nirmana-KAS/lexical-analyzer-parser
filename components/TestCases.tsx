'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TestCase {
  expression: string;
  description: string;
  valid: boolean;
}

interface TestCasesProps {
  onSelect: (expression: string) => void;
}

export default function TestCases({ onSelect }: TestCasesProps) {
  const testCases: TestCase[] = [
    { expression: '3+4*5', description: 'Simple arithmetic with addition and multiplication', valid: true },
    { expression: 'a+b', description: 'Variables with addition', valid: true },
    { expression: '(x+y)*z', description: 'Parentheses with operations', valid: true },
    { expression: '123+456', description: 'Multi-digit numbers', valid: true },
    { expression: 'a*b+c*d', description: 'Multiple multiplications and additions', valid: true },
    { expression: '((a+b))', description: 'Nested parentheses', valid: true },
    { expression: 'sin(x)', description: 'Sine function', valid: true },
    { expression: 'log(10)+sqrt(16)', description: 'Multiple functions', valid: true },
    { expression: '2^3', description: 'Power operator', valid: true },
    { expression: 'a-b*c/d%e', description: 'All operators', valid: true },
    { expression: '3+', description: 'Missing operand after operator', valid: false },
    { expression: '(a+b', description: 'Missing closing parenthesis', valid: false },
    { expression: 'a b', description: 'Missing operator between operands', valid: false },
    { expression: '*a', description: 'Operator at the beginning', valid: false },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Test Cases</h3>
      <div className="space-y-3">
        {testCases.map((testCase, index) => (
          <div
            key={index}
            className={`p-3 border rounded-lg ${
              testCase.valid ? '' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-sm font-mono font-semibold">
                    {testCase.expression}
                  </code>
                  <Badge 
                    variant={testCase.valid ? 'outline' : 'destructive'}
                    className={testCase.valid ? 'bg-green-500 text-white border-green-500' : ''}
                  >
                    {testCase.valid ? 'valid' : 'invalid'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{testCase.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelect(testCase.expression)}
              >
                Try
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
