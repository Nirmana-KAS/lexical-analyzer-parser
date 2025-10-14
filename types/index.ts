export interface Token {
  type: string;
  value: string;
  position: number;
}

export interface SymbolTableEntry {
  lexeme: string;
  token: string;
  position: number;
}

export interface ParseTreeNode {
  rule: string;
  value?: string;
  children?: ParseTreeNode[];
}

export interface ParseError {
  type: string;
  message: string;
}

export interface ParseResult {
  success: boolean;
  tokens: Token[];
  symbol_table: SymbolTableEntry[];
  parse_tree: ParseTreeNode | null;
  derivation: string[];
  message: string;
  errors: ParseError[];
  error?: string;
}
