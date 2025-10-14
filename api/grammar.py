# Grammar Definition
# E -> TE'
# E' -> +TE' | ε
# T -> FT'
# T' -> *FT' | ε
# F -> (E) | id
# id -> 0-9 | a-z | A-Z | multi-digit numbers

GRAMMAR = {
    'E': ['TE\''],
    'E\'': ['+TE\'', 'ε'],
    'T': ['FT\''],
    'T\'': ['*FT\'', 'ε'],
    'F': ['(E)', 'id'],
    'id': ['0-9', 'a-z', 'A-Z', 'multi-digit']
}

# Token types
TOKEN_TYPES = {
    'ID': 'Identifier',
    'PLUS': 'Addition Operator',
    'MULTIPLY': 'Multiplication Operator',
    'LPAREN': 'Left Parenthesis',
    'RPAREN': 'Right Parenthesis'
}
