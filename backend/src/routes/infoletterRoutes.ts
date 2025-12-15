import { Router } from 'express'
import * as infoletterController from '../controllers/infoletterController.js'
import { authenticate } from '../middleware/auth.js'
import { upload } from '../config/multer.js'

const router = Router()

// ✅ PUBLIC route - no authentication required
router.get('/public/published', infoletterController.getPublishedInfolitters)

// All other routes require authentication
router.use(authenticate)

// Image deletion MUST come before /:id routes (specificity)
router.delete('/images/:imageId', infoletterController.deleteImage)

// Infoletter CRUD
router.get('/', infoletterController.getInfoletters)
router.post('/', infoletterController.createInfoletter)
router.get('/:id', infoletterController.getInfoletter)
router.put('/:id', infoletterController.updateInfoletter)
router.delete('/:id', infoletterController.deleteInfoletter)

// Collaborators
router.post('/:infoletterId/collaborators', infoletterController.addCollaborator)
router.delete('/:infoletterId/collaborators/:userId', infoletterController.removeCollaborator)

// Images
router.post('/:infoletterId/images', upload.single('image'), infoletterController.uploadImage)

export default router
