class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0
        self.current_token = self.tokens[0] if tokens else None
        self.parse_tree = []
        self.errors = []
        
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
            tree = self.E()
            if self.current_token is None:
                return {
                    'success': True,
                    'tree': tree,
                    'message': 'Input string accepted'
                }
            else:
                return {
                    'success': False,
                    'tree': tree,
                    'message': f'Unexpected token: {self.current_token["value"]}'
                }
        except Exception as e:
            return {
                'success': False,
                'tree': None,
                'message': f'Parse error: {str(e)}'
            }
    
    def E(self):
        """E -> TE'"""
        node = {'rule': 'E', 'children': []}
        node['children'].append(self.T())
        node['children'].append(self.E_prime())
        return node
    
    def E_prime(self):
        """E' -> +TE' | ε"""
        node = {'rule': "E'", 'children': []}
        if self.current_token and self.current_token['type'] == 'PLUS':
            node['children'].append({'rule': '+', 'value': self.match('PLUS')})
            node['children'].append(self.T())
            node['children'].append(self.E_prime())
        else:
            node['children'].append({'rule': 'ε', 'value': 'epsilon'})
        return node
    
    def T(self):
        """T -> FT'"""
        node = {'rule': 'T', 'children': []}
        node['children'].append(self.F())
        node['children'].append(self.T_prime())
        return node
    
    def T_prime(self):
        """T' -> *FT' | ε"""
        node = {'rule': "T'", 'children': []}
        if self.current_token and self.current_token['type'] == 'MULTIPLY':
            node['children'].append({'rule': '*', 'value': self.match('MULTIPLY')})
            node['children'].append(self.F())
            node['children'].append(self.T_prime())
        else:
            node['children'].append({'rule': 'ε', 'value': 'epsilon'})
        return node
    
    def F(self):
        """F -> (E) | id"""
        node = {'rule': 'F', 'children': []}
        if self.current_token and self.current_token['type'] == 'LPAREN':
            node['children'].append({'rule': '(', 'value': self.match('LPAREN')})
            node['children'].append(self.E())
            if self.current_token and self.current_token['type'] == 'RPAREN':
                node['children'].append({'rule': ')', 'value': self.match('RPAREN')})
            else:
                raise Exception('Missing closing parenthesis')
        elif self.current_token and self.current_token['type'] == 'ID':
            node['children'].append({'rule': 'id', 'value': self.match('ID')})
        else:
            raise Exception(f'Expected id or (, got {self.current_token}')
        return node

def parse_tokens(tokens):
    """Parse tokens and return parse tree"""
    parser = Parser(tokens)
    result = parser.parse()
    return result
