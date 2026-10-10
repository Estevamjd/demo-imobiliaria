// Todos os leads são fictícios: só primeiro nome + inicial, telefone zerado.

export type Estagio = "novo" | "contatado" | "qualificado" | "proposta" | "ganho" | "perdido";
export type Origem = "WhatsApp" | "Site" | "Portal" | "Instagram";

export type Mensagem = { de: "lead" | "equipe"; texto: string; hora: string; auto?: boolean };

export type Lead = {
  id: string;
  nome: string;
  imovelId: string;
  origem: Origem;
  origemDetalhe: string;
  estagio: Estagio;
  entrou: string;
  chegou: string;
  hoje: boolean;
  followup?: string;
  visita?: string;
  conversa: Mensagem[];
};

export const estagios: { id: Estagio; label: string }[] = [
  { id: "novo", label: "Novo" },
  { id: "contatado", label: "Contatado" },
  { id: "qualificado", label: "Qualificado" },
  { id: "proposta", label: "Proposta" },
  { id: "ganho", label: "Ganho" },
  { id: "perdido", label: "Perdido" },
];

export const colunas: { id: string; estagios: Estagio[] }[] = [
  { id: "novo", estagios: ["novo"] },
  { id: "contatado", estagios: ["contatado"] },
  { id: "qualificado", estagios: ["qualificado"] },
  { id: "proposta", estagios: ["proposta"] },
  { id: "fechado", estagios: ["ganho", "perdido"] },
];

export const origens: Origem[] = ["WhatsApp", "Site", "Portal", "Instagram"];

export const passosPorEstagio: Record<Estagio, { quando: string; texto: string; feito?: boolean }[]> = {
  novo: [
    { quando: "Hoje", texto: "Resposta inicial enviada", feito: true },
    { quando: "D+1", texto: "Confirmar visita de sábado" },
    { quando: "D+3", texto: "Enviar imóveis parecidos se não houver retorno" },
  ],
  contatado: [
    { quando: "Hoje", texto: "Primeiro contato feito", feito: true },
    { quando: "D+1", texto: "Mandar a ficha completa e fotos extras" },
    { quando: "D+3", texto: "Propor dois horários de visita" },
  ],
  qualificado: [
    { quando: "Hoje", texto: "Visita confirmada", feito: true },
    { quando: "D+1", texto: "Lembrete da visita no WhatsApp" },
    { quando: "D+3", texto: "Perguntar o que achou e combinar próximo passo" },
  ],
  proposta: [
    { quando: "Hoje", texto: "Proposta enviada ao proprietário", feito: true },
    { quando: "D+1", texto: "Trazer o retorno do proprietário" },
    { quando: "D+3", texto: "Ajustar condições, se precisar" },
  ],
  ganho: [
    { quando: "Hoje", texto: "Proposta aceita", feito: true },
    { quando: "D+1", texto: "Enviar lista de documentos" },
    { quando: "D+3", texto: "Agendar a assinatura" },
  ],
  perdido: [
    { quando: "Hoje", texto: "Marcado como perdido", feito: true },
    { quando: "D+1", texto: "Registrar o motivo da perda" },
    { quando: "D+3", texto: "Oferecer imóveis parecidos daqui a 30 dias" },
  ],
};

export const leadsIniciais: Lead[] = [
  {
    id: "l01",
    nome: "Marina S.",
    imovelId: "cal-0012",
    origem: "WhatsApp",
    origemDetalhe: "WhatsApp · botão do imóvel",
    estagio: "novo",
    entrou: "Hoje, 22:01",
    chegou: "há 4 min",
    hoje: true,
    conversa: [
      { de: "lead", texto: "Olá! Tenho interesse na Casa Ripada (CAL-0012). Ainda está disponível?", hora: "22:01" },
      { de: "equipe", texto: "Oi! Está sim. Te mando a ficha e os horários de visita desta semana.", hora: "22:01", auto: true },
      { de: "lead", texto: "Pode ser sábado de manhã?", hora: "22:03" },
    ],
  },
  {
    id: "l02",
    nome: "Rafael T.",
    imovelId: "cal-0007",
    origem: "Site",
    origemDetalhe: "Site · formulário do imóvel",
    estagio: "novo",
    entrou: "Hoje, 21:27",
    chegou: "há 38 min",
    hoje: true,
    conversa: [
      { de: "lead", texto: "Vi o Apto Assoalho no site. O condomínio inclui água?", hora: "21:27" },
      { de: "equipe", texto: "Oi, Rafael! Inclui água e gás. Quer que eu mande a planta?", hora: "21:28", auto: true },
    ],
  },
  {
    id: "l03",
    nome: "Beatriz C.",
    imovelId: "cal-0003",
    origem: "Portal",
    origemDetalhe: "Portal de anúncios",
    estagio: "novo",
    entrou: "Hoje, 22:04",
    chegou: "22:04",
    hoje: true,
    conversa: [
      { de: "lead", texto: "O Sobrado Tijolo aceita financiamento?", hora: "22:04" },
      { de: "equipe", texto: "Aceita, sim. Posso te passar uma simulação de crédito amanhã cedo?", hora: "22:05", auto: true },
    ],
  },
  {
    id: "l04",
    nome: "Joana P.",
    imovelId: "cal-0015",
    origem: "Instagram",
    origemDetalhe: "Instagram · direct",
    estagio: "contatado",
    entrou: "Ontem, 18:40",
    chegou: "ontem",
    hoje: false,
    followup: "D+1 amanhã",
    conversa: [
      { de: "lead", texto: "Amei a varanda da Casa Pérgola! Tem mais fotos do jardim?", hora: "18:40" },
      { de: "equipe", texto: "Tem, sim! Separei mais 6 fotos e o vídeo do gramado.", hora: "18:52" },
      { de: "lead", texto: "Perfeito, vou olhar com calma.", hora: "19:10" },
    ],
  },
  {
    id: "l05",
    nome: "Caio M.",
    imovelId: "cal-0007",
    origem: "WhatsApp",
    origemDetalhe: "WhatsApp · botão do imóvel",
    estagio: "contatado",
    entrou: "Ontem, 10:12",
    chegou: "ontem",
    hoje: false,
    followup: "D+3 sex",
    conversa: [
      { de: "lead", texto: "Bom dia! O Apto Assoalho tem vaga coberta?", hora: "10:12" },
      { de: "equipe", texto: "Bom dia, Caio! Tem uma vaga coberta e um depósito.", hora: "10:20" },
    ],
  },
  {
    id: "l06",
    nome: "Luísa R.",
    imovelId: "cal-0012",
    origem: "Site",
    origemDetalhe: "Site · agendar visita",
    estagio: "qualificado",
    entrou: "Seg, 14:30",
    chegou: "seg",
    hoje: false,
    visita: "Visita sáb",
    conversa: [
      { de: "lead", texto: "Confirmo a visita na Casa Ripada sábado às 10h.", hora: "14:30" },
      { de: "equipe", texto: "Combinado! O corretor te espera no portão.", hora: "14:34" },
    ],
  },
  {
    id: "l07",
    nome: "André F.",
    imovelId: "cal-0003",
    origem: "Portal",
    origemDetalhe: "Portal de anúncios",
    estagio: "qualificado",
    entrou: "Dom, 20:05",
    chegou: "dom",
    hoje: false,
    visita: "Visita seg",
    conversa: [
      { de: "lead", texto: "Segunda depois das 18h funciona para ver o sobrado?", hora: "20:05" },
      { de: "equipe", texto: "Funciona! Deixei agendado para 18h30.", hora: "20:11" },
    ],
  },
  {
    id: "l08",
    nome: "Helena V.",
    imovelId: "cal-0015",
    origem: "WhatsApp",
    origemDetalhe: "WhatsApp · botão do imóvel",
    estagio: "proposta",
    entrou: "Sex, 09:15",
    chegou: "sex",
    hoje: false,
    conversa: [
      { de: "lead", texto: "Enviei a proposta pela Casa Pérgola. Fico no aguardo.", hora: "09:15" },
      { de: "equipe", texto: "Recebida! Levo ao proprietário hoje e te dou retorno.", hora: "09:22" },
    ],
  },
  {
    id: "l09",
    nome: "Tiago N.",
    imovelId: "cal-0007",
    origem: "Instagram",
    origemDetalhe: "Instagram · anúncio",
    estagio: "ganho",
    entrou: "Qua, 16:48",
    chegou: "qua",
    hoje: false,
    conversa: [
      { de: "equipe", texto: "Tiago, o proprietário aceitou a proposta.", hora: "16:48" },
      { de: "lead", texto: "Que ótimo! Quais documentos eu separo?", hora: "16:55" },
    ],
  },
  {
    id: "l10",
    nome: "Paula G.",
    imovelId: "cal-0012",
    origem: "Site",
    origemDetalhe: "Site · formulário do imóvel",
    estagio: "perdido",
    entrou: "Ter, 11:02",
    chegou: "ter",
    hoje: false,
    conversa: [
      { de: "equipe", texto: "Oi, Paula! Conseguiu ver as fotos da Casa Ripada?", hora: "11:02" },
      { de: "equipe", texto: "Sigo à disposição se quiser marcar visita.", hora: "D+3" },
    ],
  },
];

/** Leads extras que entram ao clicar em "+ Lead". */
export const leadsReserva: Lead[] = [
  {
    id: "l11",
    nome: "Sofia L.",
    imovelId: "cal-0021",
    origem: "Site",
    origemDetalhe: "Site · formulário do imóvel",
    estagio: "novo",
    entrou: "Hoje, agora",
    chegou: "agora",
    hoje: true,
    conversa: [
      { de: "lead", texto: "A Casa Folhagem tem quintal com sol à tarde?", hora: "agora" },
      { de: "equipe", texto: "Oi, Sofia! Tem, sim. Te mando fotos do quintal.", hora: "agora", auto: true },
    ],
  },
  {
    id: "l12",
    nome: "Bruno A.",
    imovelId: "cal-0009",
    origem: "Instagram",
    origemDetalhe: "Instagram · direct",
    estagio: "novo",
    entrou: "Hoje, agora",
    chegou: "agora",
    hoje: true,
    conversa: [
      { de: "lead", texto: "Qual o andar do Apto Luz Norte?", hora: "agora" },
      { de: "equipe", texto: "Oi, Bruno! Fica no 9º andar, face norte.", hora: "agora", auto: true },
    ],
  },
  {
    id: "l13",
    nome: "Clara D.",
    imovelId: "cal-0024",
    origem: "Portal",
    origemDetalhe: "Portal de anúncios",
    estagio: "novo",
    entrou: "Hoje, agora",
    chegou: "agora",
    hoje: true,
    conversa: [
      { de: "lead", texto: "O Sobrado Quintal já está pronto para morar?", hora: "agora" },
      { de: "equipe", texto: "Oi, Clara! Está, entregue este ano.", hora: "agora", auto: true },
    ],
  },
];

export function iniciais(nome: string) {
  return nome
    .replace(".", "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}
