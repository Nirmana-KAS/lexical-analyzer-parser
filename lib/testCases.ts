import { TestCase } from '@/types';

export const testCases: TestCase[] = [
  {
    id: '1',
    expression: '3+4*5',
    description: 'Simple arithmetic with addition and multiplication',
    expected: 'valid'
  },
  {
    id: '2',
    expression: 'a+b',
    description: 'Variables with addition',
    expected: 'valid'
  },
  {
    id: '3',
    expression: '(x+y)*z',
    description: 'Parentheses with operations',
    expected: 'valid'
  },
  {
    id: '4',
    expression: '123+456',
    description: 'Multi-digit numbers',
    expected: 'valid'
  },
  {
    id: '5',
    expression: 'a*b+c*d',
    description: 'Multiple multiplications and additions',
    expected: 'valid'
  },
  {
    id: '6',
    expression: '((a+b))',
    description: 'Nested parentheses',
    expected: 'valid'
  },
  {
    id: '7',
    expression: '3+',
    description: 'Missing operand after operator',
    expected: 'invalid'
  },
  {
    id: '8',
    expression: '(a+b',
    description: 'Missing closing parenthesis',
    expected: 'invalid'
  },
  {
    id: '9',
    expression: 'a b',
    description: 'Missing operator between operands',
    expected: 'invalid'
  },
  {
    id: '10',
    expression: '+a',
    description: 'Operator at the beginning',
    expected: 'invalid'
  }
];
