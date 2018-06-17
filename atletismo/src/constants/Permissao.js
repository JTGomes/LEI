import Authorization from '../HOC/authorization';

export const Atleta = Authorization(['Atleta', 'Diretor', 'Treinador'])
export const Treinador = Authorization(['Treinador', 'Diretor'])
export const Diretor = Authorization(['Diretor'])
