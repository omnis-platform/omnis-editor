export default class Dialog {
  constructor() {
    this.overlay = document.createElement('div')
  }

  get selectionSpanNode() {
    let el = this.selection.focusNode.parentNode

    return el.closest('span')
  }

  createOverlay() {
    this.overlay.className = 'omnis-editor-d-overlay om-s__d__o'

    this.section.appendChild(this.overlay)

    this.overlay.addEventListener('click', () => {
      this.destroy()
    })
  }

  restoreSelection() {
    const sel = window.getSelection()

    this.area.focus()

    if (window.getSelection) {
      sel.removeAllRanges()
      sel.addRange(this.range)
    } else if (document.selection && this.range.select) {
      this.range.select()
    }
  }

  destroy() {
    this.dialog.parentNode.removeChild(this.dialog)
    this.overlay.parentNode.removeChild(this.overlay)
  }
}