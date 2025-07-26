import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

const imageBuilder = createImageUrlBuilder({
  projectId: '237wvc0l',
  dataset: 'production',
})

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}