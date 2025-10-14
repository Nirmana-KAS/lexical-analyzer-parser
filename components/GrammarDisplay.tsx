'use client';

import { Card } from '@/components/ui/card';

export default function GrammarDisplay() {
  const grammarRules = [
    { lhs: 'E', rhs: "TE'" },
    { lhs: "E'", rhs: "+TE' | ε" },
    { lhs: 'T', rhs: "FT'" },
    { lhs: "T'", rhs: "*FT' | ε" },
    { lhs: 'F', rhs: '(E) | id' },
    { lhs: 'id', rhs: '0-9 | a-z | A-Z | multi-digit' },
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3">Grammar Rules</h3>
      <div className="space-y-2">
        {grammarRules.map((rule, index) => (
          <div key={index} className="flex items-center gap-3 font-mono text-sm">
            <span className="font-semibold text-blue-600 dark:text-blue-400 min-w-[60px]">
              {rule.lhs}
            </span>
            <span className="text-gray-500">→</span>
            <span className="text-gray-700 dark:text-gray-300">{rule.rhs}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-semibold mb-2">Tokens:</h4>
        <div className="space-y-1 text-sm">
          <div><span className="font-mono text-blue-600">+</span> - Addition</div>
          <div><span className="font-mono text-purple-600">*</span> - Multiplication</div>
          <div><span className="font-mono text-yellow-600">( )</span> - Parentheses</div>
          <div><span className="font-mono text-green-600">id</span> - Identifier/Number</div>
        </div>
      </div>
    </Card>
  );
}
