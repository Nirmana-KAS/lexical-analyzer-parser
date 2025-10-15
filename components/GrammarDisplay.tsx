'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowRight, Code, Hash, Plus, Minus, X, Divide, Calculator } from 'lucide-react';

export default function GrammarDisplay() {
  const grammarRules = [
    { rule: 'E', production: "TE'", description: 'Expression' },
    { rule: "E'", production: "+TE' | -TE' | ε", description: 'Expression Tail' },
    { rule: 'T', production: "FT'", description: 'Term' },
    { rule: "T'", production: "*FT' | /FT' | %FT' | ε", description: 'Term Tail' },
    { rule: 'F', production: 'P^F | P', description: 'Factor' },
    { rule: 'P', production: '(E) | func(E) | id | number', description: 'Primary' },
    { rule: 'func', production: 'sin | cos | tan | log | ln | sqrt | abs | exp', description: 'Functions' },
    { rule: 'id', production: 'a-z | A-Z | identifiers', description: 'Identifiers' },
    { rule: 'number', production: '0-9 | decimals', description: 'Numbers' },
  ];

  const operators = [
    { symbol: '+', desc: 'Addition', icon: Plus, color: 'bg-green-500' },
    { symbol: '-', desc: 'Subtraction', icon: Minus, color: 'bg-red-500' },
    { symbol: '*', desc: 'Multiplication', icon: X, color: 'bg-purple-500' },
    { symbol: '/', desc: 'Division', icon: Divide, color: 'bg-pink-500' },
    { symbol: '%', desc: 'Modulo', icon: Hash, color: 'bg-yellow-500' },
    { symbol: '^', desc: 'Power/Exponentiation', icon: Code, color: 'bg-cyan-500' },
    { symbol: '( )', desc: 'Parentheses', icon: Code, color: 'bg-orange-500' },
    { symbol: '=', desc: 'Equals', icon: Code, color: 'bg-blue-500' },
  ];

  const functions = [
    'sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'abs', 'exp'
  ];

  return (
    <Card className="modern-card rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Grammar Rules</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Context-free grammar for expression parsing
          </p>
        </div>
      </div>

      {/* Grammar Rules */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Production Rules
        </h4>
        <div className="space-y-2">
          {grammarRules.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Badge variant="outline" className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 min-w-[3rem] justify-center">
                {item.rule}
              </Badge>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="font-mono text-sm text-gray-800 dark:text-gray-200 flex-1">
                {item.production}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Operators */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Supported Operators
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {operators.map((op, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className={`p-1.5 rounded ${op.color} text-white`}>
                <op.icon className="h-3 w-3" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {op.symbol}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {op.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Functions */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
          Built-in Functions
        </h4>
        <div className="flex flex-wrap gap-2">
          {functions.map((func, index) => (
            <Badge 
              key={index}
              variant="outline"
              className="font-mono bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors cursor-default"
            >
              <Calculator className="h-3 w-3 mr-1" />
              {func}()
            </Badge>
          ))}
        </div>
      </div>

      {/* Grammar Information */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {grammarRules.length}
            </div>
            <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium">
              Grammar Rules
            </div>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {operators.length}
            </div>
            <div className="text-xs text-purple-600/70 dark:text-purple-400/70 font-medium">
              Operators
            </div>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {functions.length}
            </div>
            <div className="text-xs text-indigo-600/70 dark:text-indigo-400/70 font-medium">
              Functions
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}