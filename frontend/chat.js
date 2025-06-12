const chat = document.getElementById('chatMessages');
let plano = 'gratis';
let startTime = Date.now();
const LIMIT_GRATIS_MS = 30 * 60 * 1000;

function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'sent');
  input.value = '';

  if (plano === 'gratis' && Date.now() - startTime > LIMIT_GRATIS_MS) {
    addMessage("Seu tempo gratuito acabou. Quer continuar comigo no <a href='https://pag.ae/7_Kim2Cpu' target='_blank'>Plano Sensual 💌</a>?", 'received');
    return;
  }

  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text, plano })
  })
  .then(res => res.json())
  .then(data => addMessage(data.reply, 'received'))
  .catch(() => addMessage('Erro ao responder. Tente novamente mais tarde.', 'received'));
}

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = `message ${type}`;
  msg.innerHTML = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}
