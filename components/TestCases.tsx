'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, CheckCircle, XCircle, Play, Lightbulb } from 'lucide-react';

interface TestCase {
  expression: string;
  description: string;
  valid: boolean;
  category: 'basic' | 'advanced' | 'function' | 'invalid';
}

interface TestCasesProps {
  onSelect: (expression: string) => void;
}

export default function TestCases({ onSelect }: TestCasesProps) {
  const testCases: TestCase[] = [
    // Basic Operations
    { expression: '3+4*5', description: 'Simple arithmetic with addition and multiplication', valid: true, category: 'basic' },
    { expression: 'a+b', description: 'Variables with addition', valid: true, category: 'basic' },
    { expression: '123+456', description: 'Multi-digit numbers', valid: true, category: 'basic' },
    { expression: 'a*b+c*d', description: 'Multiple multiplications and additions', valid: true, category: 'basic' },
    
    // Advanced Operations
    { expression: '(x+y)*z', description: 'Parentheses with operations', valid: true, category: 'advanced' },
    { expression: '((a+b))', description: 'Nested parentheses', valid: true, category: 'advanced' },
    { expression: '2^3', description: 'Power operator', valid: true, category: 'advanced' },
    { expression: 'a-b*c/d%e', description: 'All operators', valid: true, category: 'advanced' },
    
    // Function Operations
    { expression: 'sin(x)', description: 'Sine function', valid: true, category: 'function' },
    { expression: 'log(10)+sqrt(16)', description: 'Multiple functions', valid: true, category: 'function' },
    { expression: 'cos(a)*tan(b)', description: 'Trigonometric functions', valid: true, category: 'function' },
    
    // Invalid Expressions
    { expression: '3+', description: 'Missing operand after operator', valid: false, category: 'invalid' },
    { expression: '(a+b', description: 'Missing closing parenthesis', valid: false, category: 'invalid' },
    { expression: 'a b', description: 'Missing operator between operands', valid: false, category: 'invalid' },
    { expression: '*a', description: 'Operator at the beginning', valid: false, category: 'invalid' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700';
      case 'function':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700';
      case 'invalid':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700';
    }
  };

  const getCategoryStats = () => {
    const stats = testCases.reduce((acc, testCase) => {
      acc[testCase.category] = (acc[testCase.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return stats;
  };

  const stats = getCategoryStats();

  return (
    <Card className="modern-card rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500">
            <FlaskConical className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Test Cases</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Try these examples to test the parser
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {testCases.length}
          </div>
          <div className="text-xs text-gray-500">Test Cases</div>
        </div>
      </div>

      {/* Test Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {stats.basic || 0}
          </div>
          <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium">Basic</div>
        </div>
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {stats.advanced || 0}
          </div>
          <div className="text-xs text-purple-600/70 dark:text-purple-400/70 font-medium">Advanced</div>
        </div>
        <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {stats.function || 0}
          </div>
          <div className="text-xs text-indigo-600/70 dark:text-indigo-400/70 font-medium">Functions</div>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-lg font-bold text-red-600 dark:text-red-400">
            {stats.invalid || 0}
          </div>
          <div className="text-xs text-red-600/70 dark:text-red-400/70 font-medium">Invalid</div>
        </div>
      </div>

      {/* Test Cases Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Lightbulb className="h-4 w-4" />
          <span>Click any test case to load it into the parser</span>
        </div>
        
        <div className="space-y-3">
          {testCases.map((testCase, index) => (
            <div
              key={index}
              className={`group p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer ${
                testCase.valid 
                  ? 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50/50 dark:hover:bg-green-900/10' 
                  : 'border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50/50 dark:hover:bg-red-900/10'
              }`}
              onClick={() => onSelect(testCase.expression)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-1.5 rounded-full ${testCase.valid ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                      {testCase.valid ? (
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${getCategoryColor(testCase.category)} text-xs font-medium`}
                    >
                      {testCase.category.charAt(0).toUpperCase() + testCase.category.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg mb-2 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                    {testCase.expression}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {testCase.description}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(testCase.expression);
                  }}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Text */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
          <Lightbulb className="h-4 w-4 mt-0.5 text-yellow-500" />
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Tips:</p>
            <ul className="space-y-1 text-xs">
              <li>• Green cases should parse successfully</li>
              <li>• Red cases demonstrate error handling</li>
              <li>• Try modifying expressions to see different results</li>
              <li>• Use parentheses to control operation precedence</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}