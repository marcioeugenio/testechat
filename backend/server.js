const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.post('/api/chat', async (req, res) => {
  const { message, plano } = req.body;

  let prompt = `Você é Camila, uma personagem sedutora, misteriosa e envolvente. O usuário disse: "${message}". Responda com elegância e charme.`;
  if (plano === 'sensual') {
    prompt += ' Agora você pode ser mais provocante e íntima, mantendo o respeito.';
  }
  if (plano === 'picante') {
    prompt += ' Agora você está no modo picante. Seja mais ousada, sem ser vulgar, e mantenha o interesse alto.';
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200
    });
    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Erro interno ao conectar com a IA.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
