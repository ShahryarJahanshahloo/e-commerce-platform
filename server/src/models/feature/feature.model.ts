import { Schema, model, Model } from 'mongoose'
import LeafCategory from '../category/leafCategory/leafCategory.model'
import FeatureSchema from './feature.schema'

export interface IFeature {
  label: string
  category: Schema.Types.ObjectId
  values: Schema.Types.ObjectId[]
}
export interface IFeatureMethods {}
export interface FeatureModel extends Model<IFeature, {}, IFeatureMethods> {}

FeatureSchema.pre('validate', async function (next) {
  const category = await LeafCategory.findById(this.category)
  if (category === null) throw new Error('category not found')
  next()
})

const Feature = model<IFeature, FeatureModel>('Feature', FeatureSchema)
export default Feature
