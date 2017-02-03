import _ from 'lodash'
import config from './config'

export function extractImg ({
  data,
  key,
  isMobile = false,
  keys = [],
  defaultImage,
  width = 1280,
  height = 'none',
  format = 'jpg',
  fit = 'clip',
  crop = 'entropy'
}) {
  let thumb

  let sizes = {
    width,
    height
  }

  let imageUrl = defaultImage || ''
  if (data) {

    let imageUrlExplicit = data.get('imageUrl')
    if (key) {
      thumb = data.get(key)
    }

    _.forEach(keys, (value) => {
      if (!thumb) {
        thumb = data.get(value)
      }
    })


    if (thumb) {
      if (typeof thumb === 'string') {
        return thumb
      }
      const path = thumb.get('path')
      if (path) {
        imageUrl = path
      }
    }

    else if (imageUrlExplicit) {
      return imageUrlExplicit
    }

  }

  if (isMobile) {
    sizes.width = Math.min(sizes.width, 768)
    sizes.height = Math.min(Math.round(sizes.width * 1.666), 650)
  }

  imageUrl = `${config.images.urlPrefix}${imageUrl}?&crop=${crop}&fit=${fit}&w=${sizes.width}&h=${sizes.height}&q=${config.images.quality}&fm=${format || config.images.type}`

  return imageUrl

}
