import ply.lex as lex

# Token list
tokens = (
    'ID',
    'PLUS',
    'MULTIPLY',
    'LPAREN',
    'RPAREN',
)

# Token rules
t_PLUS = r'\+'
t_MULTIPLY = r'\*'
t_LPAREN = r'\('
t_RPAREN = r'\)'

# Multi-digit numbers and identifiers
def t_ID(t):
    r'[a-zA-Z_][a-zA-Z0-9_]*|[0-9]+'
    return t

# Ignore spaces and tabs
t_ignore = ' \t'

# Error handling
def t_error(t):
    print(f"Illegal character '{t.value[0]}' at position {t.lexpos}")
    t.lexer.skip(1)

# Build lexer
lexer = lex.lex()

def tokenize(input_string):
    """Tokenize input string and return tokens with symbol table"""
    lexer.input(input_string)
    tokens_list = []
    symbol_table = []
    position = 0
    
    for tok in lexer:
        token_info = {
            'type': tok.type,
            'value': tok.value,
            'position': tok.lexpos
        }
        tokens_list.append(token_info)
        
        # Add to symbol table
        symbol_entry = {
            'lexeme': tok.value,
            'token': tok.type,
            'position': tok.lexpos
        }
        symbol_table.append(symbol_entry)
        position += 1
    
    return {
        'tokens': tokens_list,
        'symbol_table': symbol_table
    }
