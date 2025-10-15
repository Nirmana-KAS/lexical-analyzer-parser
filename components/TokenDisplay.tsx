'use client';

import { Token } from '@/types';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Hash, Type, Plus, X, Minus, Divide, Calculator } from 'lucide-react';

interface TokenDisplayProps {
  tokens: Token[];
}

export default function TokenDisplay({ tokens }: TokenDisplayProps) {
  const getTokenColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'id':
      case 'identifier':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'number':
      case 'num':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'plus':
      case '+':
        return 'bg-green-500 hover:bg-green-600';
      case 'minus':
      case '-':
        return 'bg-red-500 hover:bg-red-600';
      case 'multiply':
      case '*':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'divide':
      case '/':
        return 'bg-pink-500 hover:bg-pink-600';
      case 'lparen':
      case '(':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'rparen':
      case ')':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'function':
      case 'func':
        return 'bg-indigo-500 hover:bg-indigo-600';
      case 'power':
      case '^':
        return 'bg-cyan-500 hover:bg-cyan-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getTokenIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'id':
      case 'identifier':
        return <Type className="h-3 w-3" />;
      case 'number':
      case 'num':
        return <Hash className="h-3 w-3" />;
      case 'plus':
      case '+':
        return <Plus className="h-3 w-3" />;
      case 'minus':
      case '-':
        return <Minus className="h-3 w-3" />;
      case 'multiply':
      case '*':
        return <X className="h-3 w-3" />;
      case 'divide':
      case '/':
        return <Divide className="h-3 w-3" />;
      case 'function':
      case 'func':
        return <Calculator className="h-3 w-3" />;
      default:
        return <Hash className="h-3 w-3" />;
    }
  };

  if (tokens.length === 0) {
    return (
      <Card className="p-8 text-center border-0 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl">
        <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg font-medium">No tokens to display</p>
        <p className="text-gray-400 text-sm mt-2">Parse an expression to see token analysis</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Token Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tokens.length} tokens identified
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {tokens.length}
            </div>
            <div className="text-xs text-gray-500">Total Tokens</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-700">
                <TableHead className="w-[80px] font-semibold text-gray-700 dark:text-gray-300">
                  Position
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Type
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Value
                </TableHead>
                <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">
                  Category
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tokens.map((token, index) => (
                <TableRow 
                  key={index} 
                  className="border-gray-100 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="font-mono text-sm font-medium text-gray-600 dark:text-gray-400">
                    {token.position}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`${getTokenColor(token.type)} text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-default flex items-center gap-1.5 w-fit`}
                    >
                      {getTokenIcon(token.type)}
                      {token.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm font-semibold bg-gray-50 dark:bg-gray-800 rounded-md px-3 py-1 max-w-[120px]">
                    <code className="text-purple-600 dark:text-purple-400">
                      {token.value}
                    </code>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {token.type.toLowerCase().includes('number') || token.type.toLowerCase().includes('num') ? 'Operand' :
                       token.type.toLowerCase().includes('id') || token.type.toLowerCase().includes('identifier') ? 'Variable' :
                       token.type.toLowerCase().includes('function') || token.type.toLowerCase().includes('func') ? 'Function' :
                       token.type.toLowerCase().includes('paren') || token.value === '(' || token.value === ')' ? 'Grouping' :
                       'Operator'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Token Statistics */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {tokens.filter(t => t.type.toLowerCase().includes('id') || t.type.toLowerCase().includes('identifier')).length}
              </div>
              <div className="text-xs text-gray-500">Identifiers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {tokens.filter(t => t.type.toLowerCase().includes('number') || t.type.toLowerCase().includes('num')).length}
              </div>
              <div className="text-xs text-gray-500">Numbers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {tokens.filter(t => ['+', '-', '*', '/', '^', '%'].some(op => t.type.toLowerCase().includes(op.toLowerCase()) || t.value === op)).length}
              </div>
              <div className="text-xs text-gray-500">Operators</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                {tokens.filter(t => t.type.toLowerCase().includes('function') || t.type.toLowerCase().includes('func')).length}
              </div>
              <div className="text-xs text-gray-500">Functions</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}