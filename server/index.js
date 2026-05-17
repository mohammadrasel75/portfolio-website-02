require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Simple health check
app.get('/api/health', (req, res) => res.json({ ok: true }))

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, project } = req.body
    if (!name || !email || !project) return res.status(400).json({ error: 'Missing fields' })

    // Configure transporter from env
    const host = process.env.SMTP_HOST
    const port = parseInt(process.env.SMTP_PORT || '465', 10)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const to = process.env.EMAIL_TO || process.env.SMTP_USER

    if (!host || !user || !pass) return res.status(500).json({ error: 'SMTP not configured' })

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: { user, pass }
    })

    const info = await transporter.sendMail({
      from: `"${name}" <${user}>`,
      to,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${project}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${project}</p>`
    })

    return res.json({ ok: true, id: info.messageId })
  } catch (err) {
    console.error('Server send error', err)
    return res.status(500).json({ error: 'Send failed' })
  }
})

app.listen(PORT, () => console.log(`Email server listening on ${PORT}`))
