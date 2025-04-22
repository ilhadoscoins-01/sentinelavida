export interface Idoso {
  id: string
  nome: string
  idade: number
  rotinaMedicamentos: boolean
  medicamentos: { nome: string; horario: string }[]
  endereco: string
  telefones: string[]
  telefonesAcompanhantes: string[]
  possuiChave: boolean
  plano: string
  dataCadastro: string
}
