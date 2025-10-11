'use client';

import { TestCase } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TestCasesProps {
  testCases: TestCase[];
  onSelectTest: (expression: string) => void;
}

export default function TestCases({ testCases, onSelectTest }: TestCasesProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3">Test Cases</h3>
      <div className="space-y-2">
        {testCases.map((testCase) => (
          <div
            key={testCase.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {testCase.expression}
                </code>
                <Badge variant={testCase.expected === 'valid' ? 'default' : 'destructive'}>
                  {testCase.expected}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{testCase.description}</p>
            </div>
            <Button
              size="sm"
              onClick={() => onSelectTest(testCase.expression)}
              variant="outline"
            >
              Try
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
