import { db } from './firebase.js';
import { poderesPorClasse } from './poderes.js';

const raridades = [
  { nome: "Bronze", chance: 45 },
  { nome: "Prata", chance: 20 },
  { nome: "Ouro", chance: 15 },
  { nome: "Diamante", chance: 10 },
  { nome: "Mithril", chance: 6 },
  { nome: "Oricalco", chance: 4 }
];

const ranks = [
  { estrelas: 1, chance: 35 },
  { estrelas: 2, chance: 25 },
  { estrelas: 3, chance: 18 },
  { estrelas: 4, chance: 12 },
  { estrelas: 5, chance: 7 },
  { estrelas: 6, chance: 3 }
];

const profissoes = [
  "Guerreiro", "Ladino", "Lanceiro", "Monge",
  "Arqueiro", "Besteiro", "Mago", "Bruxo",
  "Druida", "Necromante", "Curandeiro", "Paladino",
  "Tanque", "Arremessador"
];

function rolar(probabilidades) {
  let rand = Math.random() * 100;
  let acumulado = 0;
  for (let i = 0; i < probabilidades.length; i++) {
    acumulado += probabilidades[i].chance;
    if (rand <= acumulado) return probabilidades[i];
  }
  return probabilidades[0];
}

function gerarNomeAleatorio() {
  const nomes = ["Kael", "Mira", "Taron", "Isolde", "Bram", "Yva", "Luthar", "Eira"];
  return nomes[Math.floor(Math.random() * nomes.length)];
}

export function invocarHeroi() {
  const raridade = rolar(raridades).nome;
  const rank = rolar(ranks).estrelas;
  const classe = profissoes[Math.floor(Math.random() * profissoes.length)];
  const grupos = poderesPorClasse[classe] || [];
  const grupo = grupos[Math.floor(Math.random() * grupos.length)];
  const poderes = grupo.poderes.sort(() => 0.5 - Math.random()).slice(0, 3);

  const heroi = {
    id: Date.now(),
    nome: gerarNomeAleatorio(),
    classe,
    raridade,
    rank,
    poderes,
    nivel: 1,
    vida: 100
  };

  jogador.herois.push(heroi);
  atualizarHerois();
  salvarNoFirestore();
}

export function atualizarHerois() {
  const div = document.getElementById("lista-herois");
  div.innerHTML = jogador.herois.map(h =>
    `<div class="card">
      <b>${h.nome}</b> ⭐${h.rank} <br>
      <i>${h.classe}</i> - <span style="color:gold">${h.raridade}</span><br>
      ${h.poderes.map(p => `🌀 ${p}`).join("<br>")}
    </div>`
  ).join("");
}