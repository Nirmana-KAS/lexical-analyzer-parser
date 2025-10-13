import ply.lex as lex

# Token list - 21 tokens total
tokens = (
    'ID',
    'NUMBER',
    'PLUS',
    'MINUS',
    'MULTIPLY',
    'DIVIDE',
    'MODULO',
    'POWER',
    'LPAREN',
    'RPAREN',
    'EQUALS',
    'SEMICOLON',
    'COMMA',
    'SIN',
    'COS',
    'TAN',
    'LOG',
    'LN',
    'SQRT',
    'ABS',
    'EXP',
)

# Reserved words for functions
reserved = {
    'sin': 'SIN',
    'cos': 'COS',
    'tan': 'TAN',
    'log': 'LOG',
    'ln': 'LN',
    'sqrt': 'SQRT',
    'abs': 'ABS',
    'exp': 'EXP',
}

# Token rules
t_PLUS = r'\+'
t_MINUS = r'-'
t_MULTIPLY = r'\*'
t_DIVIDE = r'/'
t_MODULO = r'%'
t_POWER = r'\^'
t_LPAREN = r'\('
t_RPAREN = r'\)'
t_EQUALS = r'='
t_SEMICOLON = r';'
t_COMMA = r','

# Number token (integers and decimals)
def t_NUMBER(t):
    r'\d+(\.\d+)?'
    t.value = float(t.value) if '.' in t.value else int(t.value)
    return t

# Identifier or reserved word
def t_ID(t):
    r'[a-zA-Z_][a-zA-Z0-9_]*'
    t.type = reserved.get(t.value, 'ID')
    return t

# Ignore spaces and tabs
t_ignore = ' \t'

# Newline handling
def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

# Error handling
def t_error(t):
    error_msg = f"Illegal character '{t.value[0]}' at position {t.lexpos}"
    print(error_msg)
    t.lexer.skip(1)
    return None

# Build lexer
lexer = lex.lex()

def tokenize(input_string):
    """Tokenize input string and return tokens with symbol table"""
    lexer.input(input_string)
    tokens_list = []
    symbol_table = []
    errors = []
    position = 0
    
    for tok in lexer:
        if tok is None:
            continue
            
        token_info = {
            'type': tok.type,
            'value': str(tok.value),
            'position': tok.lexpos
        }
        tokens_list.append(token_info)
        
        # Add to symbol table
        symbol_entry = {
            'lexeme': str(tok.value),
            'token': tok.type,
            'position': tok.lexpos
        }
        symbol_table.append(symbol_entry)
        position += 1
    
    return {
        'tokens': tokens_list,
        'symbol_table': symbol_table,
        'errors': errors
    }
