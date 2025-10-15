'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

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
    { expression: '3+4*5', description: 'Simple arithmetic', valid: true },
    { expression: 'a+b', description: 'Variables', valid: true },
    { expression: '(x+y)*z', description: 'Parentheses', valid: true },
    { expression: '123+456', description: 'Multi-digit', valid: true },
    { expression: 'sin(x)', description: 'Sine function', valid: true },
    { expression: '2^3', description: 'Power operator', valid: true },
    { expression: '3+', description: 'Missing operand', valid: false },
    { expression: '(a+b', description: 'Missing )', valid: false },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Test Cases</h3>
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
        {testCases.map((testCase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className={`p-3 border rounded-lg cursor-pointer transition-all ${
              testCase.valid
                ? 'bg-green-50 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800 dark:hover:bg-green-900/30'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800/50 dark:border-gray-700 dark:hover:bg-gray-800'
            }`}
            onClick={() => onSelect(testCase.expression)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {testCase.valid ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                  )}
                  <code className="text-sm font-mono font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {testCase.expression}
                  </code>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 ml-6">
                  {testCase.description}
                </p>
              </div>
              <Badge
                variant={testCase.valid ? 'default' : 'secondary'}
                className={`flex-shrink-0 ${
                  testCase.valid
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-400 text-white'
                }`}
              >
                {testCase.valid ? 'Valid' : 'Invalid'}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
