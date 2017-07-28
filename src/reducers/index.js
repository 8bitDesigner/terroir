import mapGenerator from './map-generation'
import featureGenerator from './feature-generator'
import actors from './actors'

export default function (state, action) {
  return actors(
    featureGenerator(
      mapGenerator(state, action),
      action
    ),
    action
  )
}
