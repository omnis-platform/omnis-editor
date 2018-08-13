import Dialog from './Dialog'

export default class ImageDialog extends Dialog {
  constructor(section, area, range, target, upload) {
    super()
  
    this.area = area
    this.range = range
    this.upload = upload
    this.section = section
    this.target = target
    this.rect = target.getBoundingClientRect()

    this.dialog = document.createElement('div')
    this.input = document.createElement('input')
    this.labelText = document.createElement('p')
    this.label = document.createElement('label')
  }

  create() {
    this.dialog.className = 'omnis-editor-dialog om-s__d'
    this.dialog.style.top = `${this.rect.top + 24}px`
    this.dialog.style.left = `${this.rect.left}px`

    this.input.type = 'file'
    this.input.id = 'fileInput'

    this.labelText.innerHTML = 'Drop Image <span>or click</span>'

    this.label.htmlFor = 'fileInput'
    this.label.appendChild(this.input)
    this.label.appendChild(this.labelText)

    this.dialog.appendChild(this.label)

    this.section.appendChild(this.dialog)

    this.chengesListener()
    this.createOverlay()
  }

  chengesListener() {
    this.input.addEventListener('change', e => {
      this.uploadImage(e.target.files[0])
    })
  }

  uploadImage(file) {
    this.upload.callback(file).then(res => {
      let result = res
    
      this.upload.useKeys.forEach(k => { result = result[k] })
      
      this.restoreSelection()

      document.execCommand('insertimage', false, result)

      this.destroy()
    })
  }
}