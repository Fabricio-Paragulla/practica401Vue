export type Palo = 'Picas' | 'Corazones' | 'Tréboles' | 'Diamantes';
export type Valor = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export const PALOS: Palo[] = ['Picas', 'Corazones', 'Tréboles', 'Diamantes'];
export const VALORES: Valor[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const SIMBOLOS_PALO: Record<Palo, string> = {
    'Picas': '♠️',
    'Corazones': '❤️',
    'Tréboles': '♣️',
    'Diamantes': '♦️',
};