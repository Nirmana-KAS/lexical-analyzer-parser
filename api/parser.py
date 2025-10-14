class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0
        self.current_token = self.tokens[0] if tokens else None
        self.parse_tree = []
        self.errors = []
        self.derivation_steps = []  # NEW: Track derivation steps
        
    def add_derivation(self, step):
        """Add derivation step"""
        self.derivation_steps.append(step)
        
    def advance(self):
        """Move to next token"""
        self.pos += 1
        if self.pos < len(self.tokens):
            self.current_token = self.tokens[self.pos]
        else:
            self.current_token = None
    
    def match(self, token_type):
        """Match current token with expected type"""
        if self.current_token and self.current_token['type'] == token_type:
            value = self.current_token['value']
            self.advance()
            return value
        return None
    
    def parse(self):
        """Start parsing with E rule"""
        try:
            self.add_derivation("E")
            tree = self.E()
            
            if self.current_token is None:
                return {
                    'success': True,
                    'tree': tree,
                    'message': 'Input string accepted',
                    'derivation': self.derivation_steps,
                    'errors': []
                }
            else:
                error_msg = f"Unexpected token: {self.current_token['value']} at position {self.current_token['position']}"
                return {
                    'success': False,
                    'tree': tree,
                    'message': error_msg,
                    'derivation': self.derivation_steps,
                    'errors': [{'type': 'Unexpected Token', 'message': error_msg}]
                }
        except Exception as e:
            error_msg = str(e)
            return {
                'success': False,
                'tree': None,
                'message': f'Parse error: {error_msg}',
                'derivation': self.derivation_steps,
                'errors': [{'type': 'Parse Error', 'message': error_msg}]
            }
    
    def E(self):
        """E -> TE'"""
        self.add_derivation("E → TE'")
        node = {'rule': 'E', 'children': []}
        node['children'].append(self.T())
        node['children'].append(self.E_prime())
        return node
    
    def E_prime(self):
        """E' -> +TE' | -TE' | ε"""
        if self.current_token and self.current_token['type'] in ['PLUS', 'MINUS']:
            op = self.current_token['type']
            symbol = '+' if op == 'PLUS' else '-'
            self.add_derivation(f"E' → {symbol}TE'")
            node = {'rule': "E'", 'children': []}
            node['children'].append({'rule': symbol, 'value': self.match(op)})
            node['children'].append(self.T())
            node['children'].append(self.E_prime())
        else:
            self.add_derivation("E' → ε")
            node = {'rule': "E'", 'children': []}
            node['children'].append({'rule': 'ε', 'value': 'epsilon'})
        return node
    
    def T(self):
        """T -> FT'"""
        self.add_derivation("T → FT'")
        node = {'rule': 'T', 'children': []}
        node['children'].append(self.F())
        node['children'].append(self.T_prime())
        return node
    
    def T_prime(self):
        """T' -> *FT' | /FT' | %FT' | ε"""
        if self.current_token and self.current_token['type'] in ['MULTIPLY', 'DIVIDE', 'MODULO']:
            op = self.current_token['type']
            symbol = '*' if op == 'MULTIPLY' else ('/' if op == 'DIVIDE' else '%')
            self.add_derivation(f"T' → {symbol}FT'")
            node = {'rule': "T'", 'children': []}
            node['children'].append({'rule': symbol, 'value': self.match(op)})
            node['children'].append(self.F())
            node['children'].append(self.T_prime())
        else:
            self.add_derivation("T' → ε")
            node = {'rule': "T'", 'children': []}
            node['children'].append({'rule': 'ε', 'value': 'epsilon'})
        return node
    
    def F(self):
        """F -> P^F | P"""
        node = {'rule': 'F', 'children': []}
        node['children'].append(self.P())
        
        if self.current_token and self.current_token['type'] == 'POWER':
            self.add_derivation("F → P^F")
            node['children'].append({'rule': '^', 'value': self.match('POWER')})
            node['children'].append(self.F())
        else:
            self.add_derivation("F → P")
            
        return node
    
    def P(self):
        """P -> (E) | func(E) | id | number"""
        node = {'rule': 'P', 'children': []}
        
        if self.current_token and self.current_token['type'] == 'LPAREN':
            self.add_derivation("P → (E)")
            node['children'].append({'rule': '(', 'value': self.match('LPAREN')})
            node['children'].append(self.E())
            if self.current_token and self.current_token['type'] == 'RPAREN':
                node['children'].append({'rule': ')', 'value': self.match('RPAREN')})
            else:
                raise Exception('Missing closing parenthesis')
                
        elif self.current_token and self.current_token['type'] in ['SIN', 'COS', 'TAN', 'LOG', 'LN', 'SQRT', 'ABS', 'EXP']:
            func_name = self.current_token['value']
            self.add_derivation(f"P → {func_name}(E)")
            node['children'].append({'rule': func_name, 'value': self.match(self.current_token['type'])})
            if self.current_token and self.current_token['type'] == 'LPAREN':
                node['children'].append({'rule': '(', 'value': self.match('LPAREN')})
                node['children'].append(self.E())
                if self.current_token and self.current_token['type'] == 'RPAREN':
                    node['children'].append({'rule': ')', 'value': self.match('RPAREN')})
                else:
                    raise Exception(f'Missing closing parenthesis for {func_name}')
            else:
                raise Exception(f'Expected ( after {func_name}')
                
        elif self.current_token and self.current_token['type'] == 'ID':
            self.add_derivation("P → id")
            node['children'].append({'rule': 'id', 'value': self.match('ID')})
            
        elif self.current_token and self.current_token['type'] == 'NUMBER':
            self.add_derivation("P → number")
            node['children'].append({'rule': 'number', 'value': self.match('NUMBER')})
        else:
            raise Exception(f'Expected id, number, function, or (, got {self.current_token}')
            
        return node

def parse_tokens(tokens):
    """Parse tokens and return parse tree with derivation"""
    parser = Parser(tokens)
    result = parser.parse()
    return result
