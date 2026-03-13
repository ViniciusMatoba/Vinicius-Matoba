const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/send-welcome', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Vinícius Matoba <agencia@viniciusmatoba.com.br>',
      to: [email],
      subject: '🚀 Seu Acesso ao Método VM está pronto!',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; color: #1a202c;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-size: 24px; font-weight: 800; letter-spacing: -0.025em; color: #1a1a1a; margin: 0;">MÉTODO VM</h1>
            <p style="color: #718096; font-size: 14px; margin-top: 5px;">ESTRATÉGIA DIGITAL</p>
          </div>
          
          <div style="border: 1px solid #e2e8f0; border-radius: 16px; padding: 30px; background-color: #f8fafc;">
            <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; color: #1a202c;">Olá, ${name}!</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
              É um prazer ter você conosco. Suas etapas estratégicas já foram configuradas e seu portal de acompanhamento está liberado.
            </p>
            
            <div style="margin: 25px 0; padding: 20px; background-color: #ffffff; border-radius: 12px; border-left: 4px solid #1a202c; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <p style="margin: 0 0 15px 0; font-weight: 700; color: #2d3748; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em;">Dados de Acesso Privado</p>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Portal:</strong> <a href="https://vinicius-matoba.web.app/agenciaVM" style="color: #3182ce; text-decoration: none;">Acessar Meu Painel</a></p>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Usuário:</strong> ${email}</p>
              <p style="margin: 5px 0; font-size: 15px;"><strong>Senha Inicial:</strong> <code style="background: #edf2f7; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${password}</code></p>
            </div>
            
            <p style="font-size: 14px; color: #718096; font-style: italic; margin-bottom: 0;">
              * Por segurança, o sistema solicitará o cadastro do seu nome e a alteração desta senha no primeiro login.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #edf2f7;">
            <p style="font-size: 12px; color: #a0aec0; margin: 0;">
              © 2026 Vinícius Matoba. Todos os direitos reservados.
            </p>
          </div>
        </div>
      `
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Email server running on port ${port}`);
});
