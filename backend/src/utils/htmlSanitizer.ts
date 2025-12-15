/**
 * HTML Sanitization Utility
 * Sanitizes user-generated HTML content to prevent XSS attacks
 * while preserving formatting from rich-text editors like TipTap
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Whitelist of allowed HTML tags and attributes
 * Configured for rich-text editor output (TipTap)
 */
const ALLOWED_TAGS = [
  // Text formatting
  'p', 'br', 'strong', 'em', 'u', 's', 'code',
  // Headers
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  // Lists
  'ul', 'ol', 'li',
  // Blockquote
  'blockquote',
  // Tables (if needed)
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  // Images
  'img',
  // Links
  'a',
  // Horizontal Rule
  'hr',
  // Pre-formatted code
  'pre',
]

const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  'img': ['src', 'alt', 'width', 'height', 'loading'],
  'a': ['href', 'title', 'target', 'rel'],
  '*': ['class'], // Allow classes for styling
}

/**
 * Sanitize HTML content
 * @param htmlContent Raw HTML from rich-text editor
 * @returns Sanitized HTML safe for storage and display
 */
export const sanitizeHTML = (htmlContent: string): string => {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return ''
  }

  const config = {
    ALLOWED_TAGS,
    ALLOWED_ATTR: Object.values(ALLOWED_ATTRIBUTES).flat(),
    ALLOWED_ATTR_NAMESPACES: ['data'],
  }

  return DOMPurify.sanitize(htmlContent, config)
}

/**
 * Sanitize and validate image src attributes
 * Prevents script injection through image sources
 * @param src Image source URL
 * @returns Validated image source
 */
export const sanitizeImageSrc = (src: string): string => {
  if (!src) return ''

  // Block dangerous protocols
  const blockedProtocols = ['javascript:', 'data:', 'vbscript:']
  const lowerSrc = src.toLowerCase()

  for (const protocol of blockedProtocols) {
    if (lowerSrc.startsWith(protocol)) {
      return ''
    }
  }

  return src
}

/**
 * Extract plain text from HTML
 * Useful for previews or search indexing
 * @param htmlContent HTML content
 * @returns Plain text content
 */
export const extractPlainText = (htmlContent: string): string => {
  const sanitized = sanitizeHTML(htmlContent)
  // Remove all HTML tags
  return sanitized.replace(/<[^>]*>/g, '').trim()
}

/**
 * Truncate text to specified length
 * @param text Text to truncate
 * @param maxLength Maximum length
 * @returns Truncated text with ellipsis
 */
export const truncateText = (text: string, maxLength: number = 200): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}
