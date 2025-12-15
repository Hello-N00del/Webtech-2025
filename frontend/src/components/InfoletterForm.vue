<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-slate-900 mb-2">
        {{ isEditing ? 'Infoletter bearbeiten' : 'Neuer Infoletter' }}
      </h2>
      <p class="text-slate-600">
        {{ isEditing ? 'Aktualisiere deinen Newsletter' : 'Erstelle einen neuen Newsletter' }}
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6 bg-white rounded-lg shadow-lg p-8">
      <!-- Title Field -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 mb-2">
          Titel *
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="z.B. Newsletter März 2025"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <p v-if="errors.title" class="text-red-600 text-sm mt-1">{{ errors.title }}</p>
      </div>

      <!-- Image Upload Section (Available from creation) -->
      <div v-if="isEditing" class="space-y-4 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
        <div>
          <label class="block text-sm font-semibold text-slate-900 mb-2">
            📸 Bilder hochladen
          </label>
          <div class="space-y-3">
            <!-- Upload Input -->
            <div class="flex gap-2">
              <input
                ref="imageInput"
                type="file"
                accept="image/*"
                @change="handleImageSelect"
                class="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                @click="uploadImage"
                :disabled="!selectedImage || uploading"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="uploading" class="flex items-center gap-2">
                  <span class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Lädt...
                </span>
                <span v-else>Hochladen</span>
              </button>
            </div>
            <p v-if="uploadError" class="text-red-600 text-sm">❌ {{ uploadError }}</p>

            <!-- Image Gallery -->
            <div v-if="images.length > 0" class="mt-4">
              <h3 class="text-sm font-semibold text-slate-900 mb-3">{{ images.length }} Bild(er)</h3>
              <div class="grid grid-cols-3 gap-3">
                <div
                  v-for="image in images"
                  :key="image.id"
                  class="relative group"
                >
                  <img
                    :src="getImageUrl(image)"
                    :alt="image.filename"
                    @error="handleImageError(image)"
                    class="w-full h-24 object-cover rounded-lg border border-slate-200"
                  />
                  <button
                    type="button"
                    @click="removeImage(image.id)"
                    class="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                  <p class="text-xs text-slate-600 mt-1 truncate">{{ image.filename }}</p>
                </div>
              </div>
            </div>
            <p v-else class="text-sm text-slate-600 italic">Keine Bilder hinzugefügt</p>
          </div>
        </div>
      </div>

      <!-- Hint for Create -->
      <div v-if="!isEditing" class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p class="text-sm text-blue-700">
          💡 <strong>Tipp:</strong> Bilder können nach dem Erstellen des Infoletters hinzugefügt werden.
        </p>
      </div>

      <!-- Rich-Text Editor Section -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 mb-2">
          Inhalt *
        </label>
        <div v-if="editor" class="border border-slate-300 rounded-lg overflow-hidden">
          <!-- Toolbar -->
          <div class="flex flex-wrap gap-1 bg-slate-100 border-b border-slate-300 p-2">
            <!-- Text Format Buttons -->
            <button
              type="button"
              @click="editor.chain().focus().toggleBold().run()"
              :class="['px-3 py-1 rounded text-sm font-medium transition', editor.isActive('bold') ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-300 hover:bg-slate-50']"
              title="Bold (Ctrl+B)"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleItalic().run()"
              :class="['px-3 py-1 rounded text-sm font-medium transition', editor.isActive('italic') ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-300 hover:bg-slate-50']"
              title="Italic (Ctrl+I)"
            >
              <em>I</em>
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleUnderline().run()"
              :class="['px-3 py-1 rounded text-sm font-medium transition', editor.isActive('underline') ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-300 hover:bg-slate-50']"
              title="Underline (Ctrl+U)"
            >
              <u>U</u>
            </button>
            <div class="border-l border-slate-300 mx-1"></div>

            <!-- Heading Buttons -->
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="['px-3 py-1 rounded text-sm font-medium transition', editor.isActive('heading', { level: 1 }) ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-300 hover:bg-slate-50']"
              title="Heading 1"
            >
              H1
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="['px-3 py-1 rounded text-sm font-medium transition', editor.isActive('heading', { level: 2 }) ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-300 hover:bg-slate-50']"
              title="Heading 2"
            >
              H2
            </button>
            <div class="border-l border-slate-300 mx-1"></div>

            <!-- List Buttons -->
            <button
              type="button"
              @click="editor.chain().focus().toggleBulletList().run()"
              :class="['px-3 py-1 rounded text-sm font-medium transition', editor.isActive('bulletList') ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-300 hover:bg-slate-50']"
              title="Bullet List"
            >
              •
            </button>
            <button
              type="button"
              @click="editor.chain().focus().toggleOrderedList().run()"
              :class="['px-3 py-1 rounded text-sm font-medium transition', editor.isActive('orderedList') ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-300 hover:bg-slate-50']"
              title="Ordered List"
            >
              1.
            </button>
            <div class="border-l border-slate-300 mx-1"></div>

            <!-- Clear Button -->
            <button
              type="button"
              @click="editor.chain().focus().clearNodes().run()"
              class="px-3 py-1 rounded text-sm font-medium bg-white border border-slate-300 hover:bg-slate-50 transition"
              title="Clear Formatting"
            >
              Clear
            </button>
          </div>

          <!-- Editor -->
          <EditorContent :editor="editor" class="editor-content p-4 min-h-96 focus:outline-none" />
        </div>
        <p v-if="errors.content" class="text-red-600 text-sm mt-1">{{ errors.content }}</p>
      </div>

      <!-- Status Field -->
      <div>
        <label class="block text-sm font-semibold text-slate-900 mb-2">
          Status
        </label>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="form.status"
              type="radio"
              value="DRAFT"
              class="w-4 h-4"
            />
            <span class="text-slate-700">Entwurf</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="form.status"
              type="radio"
              value="PUBLISHED"
              class="w-4 h-4"
            />
            <span class="text-slate-700">Veröffentlicht</span>
          </label>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
        ❌ {{ error }}
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 pt-4 border-t border-slate-200">
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="loading" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
          {{ loading ? 'Wird gespeichert...' : (isEditing ? 'Änderungen speichern' : 'Infoletter erstellen') }}
        </button>
        <router-link
          to="/infoletter"
          class="px-6 py-3 bg-slate-200 text-slate-900 rounded-lg font-semibold hover:bg-slate-300 transition text-center"
        >
          Abbrechen
        </router-link>
      </div>
    </form>

    <!-- Collaborators Section (Edit only) -->
    <div v-if="isEditing" class="bg-white rounded-lg shadow-lg p-8 space-y-6">
      <div>
        <h3 class="text-xl font-bold text-slate-900 mb-4">Mitarbeiter</h3>
        <div class="space-y-4">
          <!-- Collaborator List -->
          <div v-if="collaborators.length > 0" class="space-y-2">
            <div
              v-for="collab in collaborators"
              :key="collab.userId"
              class="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
            >
              <div>
                <p class="font-medium text-slate-900">{{ collab.user.name }}</p>
                <p class="text-sm text-slate-600">{{ collab.user.email }}</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-semibold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                  {{ collab.role }}
                </span>
                <button
                  @click="removeCollaborator(collab.userId)"
                  class="text-red-600 hover:text-red-700 transition"
                  type="button"
                >
                  Entfernen
                </button>
              </div>
            </div>
          </div>
          <p v-else class="text-slate-600">Keine Mitarbeiter hinzugefügt</p>

          <!-- Add Collaborator Form -->
          <div class="border-t pt-4 mt-4">
            <h4 class="font-semibold text-slate-900 mb-3">Mitarbeiter hinzufügen</h4>
            <p class="text-sm text-slate-600 mb-3">📝 Hinweis: User-Lookup nach Email ist noch nicht implementiert. Bitte verwende für Tests direkt die User-IDs.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { infoletterService } from '../services/infoletterService'

const router = useRouter()
const route = useRoute()

const isEditing = computed(() => !!route.params.id)

const form = ref({
  title: '',
  content: '',
  status: 'DRAFT' as 'DRAFT' | 'PUBLISHED'
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const error = ref('')
const collaborators = ref<any[]>([])
const images = ref<any[]>([])
const selectedImage = ref<File | null>(null)
const uploading = ref(false)
const uploadError = ref('')
const imageInput = ref<HTMLInputElement>()
const failedImages = ref<Set<string>>(new Set())

// Initialize TipTap Editor
const editor = useEditor({
  extensions: [
    StarterKit,
    Underline
  ],
  content: form.value.content,
  onUpdate: ({ editor }) => {
    form.value.content = editor.getHTML()
  }
})

const loadInfoletter = async () => {
  if (!isEditing.value || !route.params.id) return

  try {
    const infoletter = await infoletterService.getById(route.params.id as string)
    console.log('Loaded infoletter:', infoletter)
    
    form.value = {
      title: infoletter.title,
      content: infoletter.content,
      status: infoletter.status
    }
    collaborators.value = infoletter.collaborators || []
    images.value = infoletter.images || []
    
    console.log('Images loaded:', images.value)
    
    // Update editor content
    if (editor) {
      editor.commands.setContent(infoletter.content)
    }
  } catch (err: any) {
    error.value = 'Fehler beim Laden des Infoletters: ' + (err.message || 'Unbekannter Fehler')
    console.error('Error loading infoletter:', err)
  }
}

const handleSubmit = async () => {
  errors.value = {}
  error.value = ''
  loading.value = true

  try {
    // Validation
    if (!form.value.title.trim()) {
      errors.value.title = 'Titel ist erforderlich'
    }
    if (!form.value.content.trim()) {
      errors.value.content = 'Inhalt ist erforderlich'
    }

    if (Object.keys(errors.value).length > 0) {
      loading.value = false
      return
    }

    if (isEditing.value && route.params.id) {
      // Update
      await infoletterService.update(route.params.id as string, form.value)
    } else {
      // Create
      await infoletterService.create(form.value)
    }

    router.push('/infoletter')
  } catch (err: any) {
    error.value = err.message || 'Fehler beim Speichern'
    console.error('Error saving infoletter:', err)
  } finally {
    loading.value = false
  }
}

const handleImageSelect = (event: Event) => {
  uploadError.value = ''
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      uploadError.value = 'Datei zu groß (max. 5MB)'
      return
    }
    selectedImage.value = file
  }
}

const uploadImage = async () => {
  if (!selectedImage.value || !isEditing.value || !route.params.id) return

  uploading.value = true
  uploadError.value = ''
  
  try {
    console.log('Uploading image:', selectedImage.value.name)
    const response = await infoletterService.uploadImage(
      route.params.id as string,
      selectedImage.value
    )
    
    console.log('Upload response:', response)
    
    // Add URL to response if not present
    const imageWithUrl = {
      ...response,
      url: response.url || response.filepath
    }
    
    images.value.push(imageWithUrl)
    selectedImage.value = null
    if (imageInput.value) {
      imageInput.value.value = ''
    }
  } catch (err: any) {
    uploadError.value = err.message || 'Fehler beim Hochladen des Bildes'
    console.error('Error uploading image:', err)
  } finally {
    uploading.value = false
  }
}

/**
 * ✅ FIXED: Generate absolute URLs for images
 * Images are served by backend at http://localhost:3000/uploads/...
 * But frontend runs on http://localhost:5173
 * So we need absolute URLs pointing to backend
 */
const getImageUrl = (image: any): string => {
  // Get backend URL from environment variable or use default
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
  const backendUrl = apiUrl.replace('/api', '') // Remove /api suffix to get base URL
  
  console.log('🖼️ Generating image URL for:', image)
  console.log('Backend URL:', backendUrl)
  
  // Check if image.url exists and is absolute
  if (image.url) {
    const finalUrl = image.url.startsWith('http') 
      ? image.url 
      : `${backendUrl}${image.url}`
    console.log('Using image.url:', finalUrl)
    return finalUrl
  }
  
  // Check if image.filepath exists and is absolute
  if (image.filepath) {
    const finalUrl = image.filepath.startsWith('http')
      ? image.filepath
      : `${backendUrl}${image.filepath}`
    console.log('Using image.filepath:', finalUrl)
    return finalUrl
  }
  
  // Fallback: construct URL from filename
  const fallbackUrl = `${backendUrl}/uploads/infoletter-images/${image.filename}`
  console.log('Using fallback URL:', fallbackUrl)
  return fallbackUrl
}

const handleImageError = (image: any) => {
  console.error('❌ Failed to load image:', image)
  console.error('Tried URL:', getImageUrl(image))
  failedImages.value.add(image.id)
}

const removeImage = async (imageId: string) => {
  if (!confirm('Bist du sicher?')) return

  try {
    await infoletterService.deleteImage(imageId)
    images.value = images.value.filter(i => i.id !== imageId)
  } catch (err: any) {
    error.value = 'Fehler beim Löschen des Bildes'
    console.error('Error deleting image:', err)
  }
}

const removeCollaborator = async (userId: string) => {
  if (!isEditing.value || !route.params.id) return

  try {
    await infoletterService.removeCollaborator(route.params.id as string, userId)
    collaborators.value = collaborators.value.filter(c => c.userId !== userId)
  } catch (err: any) {
    error.value = err.message || 'Fehler beim Entfernen des Mitarbeiters'
  }
}

onMounted(() => {
  loadInfoletter()
})
</script>

<style scoped>
.editor-content :deep(p) {
  margin: 0.5rem 0;
}

.editor-content :deep(h1) {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0 0.5rem 0;
}

.editor-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.8rem 0 0.4rem 0;
}

.editor-content :deep(ul),
.editor-content :deep(ol) {
  margin: 0.5rem 0 0.5rem 1.5rem;
  padding-left: 0;
}

.editor-content :deep(li) {
  margin: 0.25rem 0;
  line-height: 1.5;
}

.editor-content :deep(blockquote) {
  border-left: 4px solid #4f46e5;
  padding-left: 1rem;
  margin: 0.5rem 0;
  font-style: italic;
  color: #6b7280;
}

.editor-content :deep(code) {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: monospace;
}

.editor-content :deep(pre) {
  background-color: #1f2937;
  color: #e5e7eb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 0.5rem 0;
}

.editor-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
}
</style>
