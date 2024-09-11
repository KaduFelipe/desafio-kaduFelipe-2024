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
    // Verificar se o animal é válido
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }

    // Verificar se a quantidade é um número positivo
    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    // Obter detalhes do animal
    const detalhesAnimal = this.animais[animal];
    const tamanhoAnimal = this.animais[animal].tamanho;
    const biomasAnimal = this.animais[animal].biomas;
    const carnivoroAnimal = this.animais[animal].carnivoro;
    

    let recintosViaveis = [];

    // Verificar cada recinto
    for (let i = 0; i < this.recintos.length; i++) {
      const recinto = this.recintos[i];

      // Calcular o espaço ocupado no recinto
      let espacoOcupado = 0;
      for (let j = 0; j < recinto.animais.length; j++) {
        const a = recinto.animais[j];
        const especieAnimal = this.animais[a.especie];
        espacoOcupado += a.quantidade * especieAnimal.tamanho;
      }
      const espacoDisponivel = recinto.tamanho - espacoOcupado;

      // Verificar se o recinto é compatível com o bioma do animal
      let biomaCompatível = false;
      for (let k = 0; k < biomasAnimal.length; k++) {
        if (recinto.biomas.includes(biomasAnimal[k])) {
          biomaCompatível = true;
          break;
        }
      }

      // Verificar se o recinto é adequado para um animal carnívoro
      let conviveComCarnivoros = true;
      if (carnivoroAnimal) {
        for (let l = 0; l < recinto.animais.length; l++) {
          const a = recinto.animais[l];
          if (this.animais[a.especie].carnivoro !== carnivoroAnimal) {
            conviveComCarnivoros = false;
            break;
          }
        }
      }

      // Verificar se há espaço suficiente para o animal
      const espacoSuficiente = espacoDisponivel >= (tamanhoAnimal * quantidade);

      // Verificar se o recinto é adequado para hipopótamos
      const regrasHipopotamo = animal !== "HIPOPOTAMO" || recinto.biomas.includes("rio");

      // Adicionar o recinto à lista de viáveis se todas as condições forem atendidas
      if (biomaCompatível && conviveComCarnivoros && espacoSuficiente && regrasHipopotamo) {
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - (tamanhoAnimal * quantidade)} total: ${recinto.tamanho})`);
      }
    }

    // Retornar o resultado
    if (recintosViaveis.length > 0) {
      return `Recintos viáveis: ${recintosViaveis.join(', ')}`;
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
}

// Exportando a classe RecintosZoo
export { RecintosZoo };

// Bloco de execução - Testando a classe RecintosZoo
const zoologico = new RecintosZoo();

// Testando colocar mais um animal 
const resultado = zoologico.analisaRecintos('GAZELA', 2);
console.log(resultado);


