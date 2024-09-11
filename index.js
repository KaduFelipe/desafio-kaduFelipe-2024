import { RecintosZoo } from './recintos-zoo.js';

// Exemplo de teste
const zoologico = new RecintosZoo();

const resultado = zoologico.analisaRecintos('MACACO', 2);
if (resultado.recintosViaveis) {
  console.log('Recintos viáveis:', resultado.recintosViaveis.map(r => r.match(/\d+/)[0])); // Extrai e mostra o número do recinto
} else {
  console.log(resultado.erro);
}


