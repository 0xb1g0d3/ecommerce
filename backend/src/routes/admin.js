import { Router } from 'express'
import { products } from '../data/products.js'

const router = Router()

router.get('/products', (_req, res) => {
  res.json(products)
})

router.post('/products', (req, res) => {
  const { id, title, price, stock = 0, category = 'geral' } = req.body
  if (!id || !title || !price) {
    return res.status(400).json({ message: 'id, title e price são obrigatórios' })
  }

  const exists = products.find((p) => p.id === id)
  if (exists) {
    return res.status(409).json({ message: 'Já existe um produto com este id' })
  }

  const product = { id, title, price, stock, category }
  products.push(product)
  return res.status(201).json(product)
})

router.put('/products/:id', (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id)
  if (idx === -1) {
    return res.status(404).json({ message: 'Produto não encontrado' })
  }

  products[idx] = { ...products[idx], ...req.body }
  return res.json(products[idx])
})

router.delete('/products/:id', (req, res) => {
  const idx = products.findIndex((p) => p.id === req.params.id)
  if (idx === -1) {
    return res.status(404).json({ message: 'Produto não encontrado' })
  }
  products.splice(idx, 1)
  return res.status(204).send()
})

export { router as adminRoutes }
