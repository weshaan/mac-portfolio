import { useCallback, useEffect, useRef, useState } from 'react'
import * as pdfjs from 'pdfjs-dist'
import { DesktopWindow } from './desktop/DesktopWindow'
import type { WindowPoint } from '../hooks/useDraggableWindow'
import './ResumePdfWindow.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export const RESUME_PDF_URL = '/desktop/Eshaan_Walia_resume.pdf'
export const RESUME_PDF_NAME = 'Eshaan_Walia_resume.pdf'

const DEFAULT_ZOOM = 0.75
const MIN_ZOOM = 0.3
const MAX_ZOOM = 2
const ZOOM_STEP = 0.15
/** CSS layout scale at 100% zoom — bitmap is rendered at higher DPR. */
const DISPLAY_SCALE = 1.5

type Props = {
  windowId: string
  zIndex: number
  position: WindowPoint
  onPositionChange: (point: WindowPoint) => void
  onFocus: () => void
  onClose: () => void
}

export function ResumePdfWindow({
  windowId,
  zIndex,
  position,
  onPositionChange,
  onFocus,
  onClose,
}: Props) {
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
  const pageMeta = `${pageCount} ${pageCount === 1 ? 'page' : 'pages'}`

  const zoomToolbar = (
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
  )

  return (
    <DesktopWindow
      windowId={windowId}
      title={RESUME_PDF_NAME}
      subtitle={pageMeta}
      variant="preview"
      zIndex={zIndex}
      position={position}
      onPositionChange={onPositionChange}
      onFocus={onFocus}
      onClose={onClose}
      toolbarEnd={zoomToolbar}
    >
      <div className="resume-pdf__viewport">
        {loading && <p className="resume-pdf__status">Loading…</p>}
        {error && <p className="resume-pdf__status resume-pdf__status--error">{error}</p>}
        <div ref={pagesRef} className="resume-pdf__pages" hidden={loading || Boolean(error)} />
      </div>
    </DesktopWindow>
  )
}
