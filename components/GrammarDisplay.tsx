'use client';

import { Card } from '@/components/ui/card';

export default function GrammarDisplay() {
  const grammarRules = [
    { rule: 'E', production: "TE'" },
    { rule: "E'", production: "+TE' | -TE' | ε" },
    { rule: 'T', production: "FT'" },
    { rule: "T'", production: "*FT' | /FT' | %FT' | ε" },
    { rule: 'F', production: 'P^F | P' },
    { rule: 'P', production: '(E) | func(E) | id | number' },
    { rule: 'func', production: 'sin | cos | tan | log | ln | sqrt | abs | exp' },
    { rule: 'id', production: 'a-z | A-Z | identifiers' },
    { rule: 'number', production: '0-9 | decimals' },
  ];

  const tokens = [
    { symbol: '+', desc: 'Addition' },
    { symbol: '-', desc: 'Subtraction' },
    { symbol: '*', desc: 'Multiplication' },
    { symbol: '/', desc: 'Division' },
    { symbol: '%', desc: 'Modulo' },
    { symbol: '^', desc: 'Power/Exponentiation' },
    { symbol: '( )', desc: 'Parentheses' },
    { symbol: '=', desc: 'Equals' },
    { symbol: ';', desc: 'Semicolon' },
    { symbol: ',', desc: 'Comma' },
    { symbol: 'id', desc: 'Identifier/Number' },
    { symbol: 'sin', desc: 'Sine function' },
    { symbol: 'cos', desc: 'Cosine function' },
    { symbol: 'tan', desc: 'Tangent function' },
    { symbol: 'log', desc: 'Logarithm base 10' },
    { symbol: 'ln', desc: 'Natural logarithm' },
    { symbol: 'sqrt', desc: 'Square root' },
    { symbol: 'abs', desc: 'Absolute value' },
    { symbol: 'exp', desc: 'Exponential e^x' },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Grammar Rules</h3>
      <div className="space-y-2 mb-6">
        {grammarRules.map((item, index) => (
          <div key={index} className="flex items-start gap-3 font-mono text-sm">
            <span className="text-blue-600 font-semibold min-w-12">{item.rule}</span>
            <span className="text-gray-600">→</span>
            <span className="text-gray-800">{item.production}</span>
          </div>
        ))}
      </div>

      <h4 className="text-md font-semibold mb-3 mt-6">Tokens:</h4>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {tokens.map((token, index) => (
          <div key={index} className="flex gap-2">
            <span className="font-mono text-purple-600">{token.symbol}</span>
            <span className="text-gray-600">- {token.desc}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
