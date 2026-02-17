import express from 'express'
import cors from 'cors'
import { router } from './src/routes.js'
import cookieParser from 'cookie-parser'

export const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
    "http://localhost:5173",
    "https://projeto-casa-do-hamburguer.vercel.app"
  ],
    credentials: true
}))


app.use(router)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
