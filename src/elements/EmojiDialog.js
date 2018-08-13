import Dialog from './Dialog'

export default class EmojiDialog extends Dialog {
  constructor(section, area, range, target) {
    super()

    this.area = area
    this.range = range
    this.section = section
    this.target = target
    this.rect = target.getBoundingClientRect()

    this.dialog = document.createElement('div')
  
    this.emojies = [ ...Array(106).keys() ].map(i => `_${i + 1}.svg`)
  }

  create() {
    this.dialog.className = 'omnis-editor-dialog om-s__d'
    this.dialog.style.top = `${this.rect.top + 24}px`
    this.dialog.style.left = `${this.rect.left}px`

    this.emojies.forEach(emoji => {
      const img = document.createElement('img')
      img.src = require(`../../img/${emoji}`)
      img.style.width = '30px'
      img.style.height = '30px'

      this.dialog.appendChild(img)
    })

    this.section.appendChild(this.dialog)

    this.createOverlay()
  }
}