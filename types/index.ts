export interface Token {
  type: string;
  value: string;
  position: number;
}

export interface SymbolTableEntry {
  lexeme: string;
  token: string;
  position: number;
  [key: string]: string | number; // Add index signature
}

export interface ParseTreeNode {
  rule: string;
  value?: string;
  children?: ParseTreeNode[];
}

export interface ParseResult {
  success: boolean;
  tokens: Token[];
  symbol_table: SymbolTableEntry[];
  parse_tree: ParseTreeNode | null;
  message: string;
  error?: string;
}

export interface TestCase {
  id: string;
  expression: string;
  description: string;
  expected: "valid" | "invalid";
}
