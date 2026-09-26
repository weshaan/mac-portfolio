import { useCallback, useEffect, useRef, useState } from 'react'
import * as pdfjs from 'pdfjs-dist'
import './ResumePdfWindow.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export const RESUME_PDF_URL = '/desktop/Eshaan_Walia_resume.pdf'
export const RESUME_PDF_NAME = 'Eshaan_Walia_resume.pdf'

const DEFAULT_ZOOM = 0.75
const MIN_ZOOM = 0.6
const MAX_ZOOM = 2
const ZOOM_STEP = 0.15
/** CSS layout scale at 100% zoom — bitmap is rendered at higher DPR. */
const DISPLAY_SCALE = 1.5

type Props = {
  onClose: () => void
}

export function ResumePdfWindow({ onClose }: Props) {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [pageCount, setPageCount] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pdfRef = useRef<pdfjs.PDFDocumentProxy | null>(null)
  const pagesRef = useRef<HTMLDivElement>(null)

  const render = useCallback(async (doc: pdfjs.PDFDocumentProxy, zoomLevel: number) => {
    const host = pagesRef.current
    if (!host) return
    host.innerHTML = ''

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 3)
    const layoutScale = DISPLAY_SCALE * zoomLevel

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i)
      const viewport = page.getViewport({ scale: layoutScale })
      const renderViewport = page.getViewport({ scale: layoutScale * pixelRatio })
      const canvas = document.createElement('canvas')
      canvas.className = 'resume-pdf__page'
      canvas.style.width = `${Math.floor(viewport.width)}px`
      canvas.style.height = `${Math.floor(viewport.height)}px`
      canvas.width = Math.floor(renderViewport.width)
      canvas.height = Math.floor(renderViewport.height)
      host.appendChild(canvas)
      const ctx = canvas.getContext('2d')
      if (!ctx) continue

      await page.render({
        canvasContext: ctx,
        viewport: renderViewport,
        canvas,
      }).promise
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const task = pdfjs.getDocument({ url: RESUME_PDF_URL })
    task.promise
      .then((doc) => {
        if (cancelled) return
        pdfRef.current = doc
        setPageCount(doc.numPages)
        setLoading(false)
      })
      .catch(() => {
        if (!cancelled) {
          setError('Could not load the resume PDF.')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
      pdfRef.current = null
      void task.destroy()
    }
  }, [])

  useEffect(() => {
    const doc = pdfRef.current
    if (!doc || loading || error) return
    void render(doc, zoom)
  }, [zoom, loading, error, render])

  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, Math.round((z - ZOOM_STEP) * 100) / 100))
  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, Math.round((z + ZOOM_STEP) * 100) / 100))
  const zoomReset = () => setZoom(DEFAULT_ZOOM)

  const zoomLabel = `${Math.round(zoom * 100)}%`

  return (
    <div className="resume-pdf-overlay" role="dialog" aria-modal="true" aria-label={RESUME_PDF_NAME}>
      <div className="resume-pdf">
        <header className="resume-pdf__toolbar">
          <div className="resume-pdf__traffic">
            <button
              type="button"
              className="resume-pdf__dot resume-pdf__dot--close"
              onClick={onClose}
              aria-label="Close"
            />
            <span className="resume-pdf__dot resume-pdf__dot--min" aria-hidden />
            <span className="resume-pdf__dot resume-pdf__dot--max" aria-hidden />
          </div>
          <div className="resume-pdf__title-block">
            <span className="resume-pdf__filename">{RESUME_PDF_NAME}</span>
            <span className="resume-pdf__meta">
              {pageCount} {pageCount === 1 ? 'page' : 'pages'}
            </span>
          </div>
          <div className="resume-pdf__zoom" aria-label="Zoom">
            <button type="button" className="resume-pdf__zoom-btn" onClick={zoomOut} aria-label="Zoom out">
              −
            </button>
            <button type="button" className="resume-pdf__zoom-pct" onClick={zoomReset} aria-label="Reset zoom">
              {zoomLabel}
            </button>
            <button type="button" className="resume-pdf__zoom-btn" onClick={zoomIn} aria-label="Zoom in">
              +
            </button>
          </div>
        </header>
        <div className="resume-pdf__viewport">
          {loading && <p className="resume-pdf__status">Loading…</p>}
          {error && <p className="resume-pdf__status resume-pdf__status--error">{error}</p>}
          <div ref={pagesRef} className="resume-pdf__pages" hidden={loading || Boolean(error)} />
        </div>
      </div>
    </div>
  )
}
