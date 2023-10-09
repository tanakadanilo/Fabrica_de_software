export interface Page<T> {
  content: T[]; // Conteúdo da página
  totalElements: number; // Total de elementos na coleção
  totalPages: number; // Total de páginas
  number: number; // Número da página atual (baseado em zero)
  size: number; // Tamanho da página
  numberOfElements: number; // Número de elementos na página atual
}
