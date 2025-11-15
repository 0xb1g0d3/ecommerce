import { Router } from 'express'
import { products } from '../data/products.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json(products)
})

router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id)
  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' })
  }
  return res.json(product)
})

export { router as productRoutes }
