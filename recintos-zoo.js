class RecintosZoo {
  constructor() {
    // Definir os animais com suas propriedades
    this.animais = {
      "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
      "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
      "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
      "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
      "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
      "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
    };

    // Definir os recintos com suas características
    this.recintos = [
      { numero: 1, biomas: ["savana"], tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
      { numero: 2, biomas: ["floresta"], tamanho: 5, animais: [] },
      { numero: 3, biomas: ["savana", "rio"], tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
      { numero: 4, biomas: ["rio"], tamanho: 8, animais: [] },
      { numero: 5, biomas: ["savana"], tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
    ];
  }

  analisaRecintos(animal, quantidade) {
    // Validar entradas
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const { tamanho, biomas, carnivoro } = this.animais[animal];
    let recintosViaveis = [];

    for (let recinto of this.recintos) {
      const espacoOcupado = recinto.animais.reduce((sum, a) => sum + (a.quantidade * this.animais[a.especie].tamanho), 0);
      const espacoExtra = recinto.animais.length > 0 ? 1 : 0; // Espaço extra se houver mais de uma espécie
      const espacoDisponivel = recinto.tamanho - espacoOcupado - espacoExtra;

      // Verificar biomas compatíveis
      const biomaCompativel = biomas.some(b => recinto.biomas.includes(b));

      // Regras para animais carnívoros
      const conviveComCarnivoros = recinto.animais.every(a => this.animais[a.especie].carnivoro === carnivoro);
      const podeConvivencia = carnivoro ? conviveComCarnivoros : true;

      // Verificar espaço suficiente e outras regras específicas
      const espacoSuficiente = espacoDisponivel >= (tamanho * quantidade);
      const regrasHipopotamo = (animal !== "HIPOPOTAMO" || recinto.biomas.includes("rio"));

      if (biomaCompativel && podeConvivencia && espacoSuficiente && regrasHipopotamo) {
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - (tamanho * quantidade)} total: ${recinto.tamanho})`);
      }
    }

    if (recintosViaveis.length > 0) {
      // Exibir mensagem diretamente em vez de array
      return `Recintos viáveis: ${recintosViaveis.join(', ')}`;
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
}

// Bloco de execução - Testando a classe RecintosZoo
const zoologico = new RecintosZoo();

// Testando animais a acrescentar 
console.log(zoologico.analisaRecintos('MACACO', 2));


