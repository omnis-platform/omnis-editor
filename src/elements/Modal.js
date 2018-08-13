export default class Modal {
  constructor() {
    this.modal = document.createElement('div')
    this.overlay = document.createElement('div')
  }

  get selectionSpanNode() {
    let el = this.selection.focusNode.parentNode

    return el.closest('span')
  }

  createModal() {
    this.modal.className = 'omnis-editor-m om-s__m'
    this.overlay.className = 'omnis-editor-d-overlay om-s__m__o'

    this.section.appendChild(this.overlay)
    this.section.appendChild(this.modal)

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
    this.modal.parentNode.removeChild(this.modal)
    this.overlay.parentNode.removeChild(this.overlay)
  }
}