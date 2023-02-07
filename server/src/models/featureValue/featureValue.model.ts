import { Schema, model, Model } from 'mongoose'
import FeatureValueSchema from './featureValue.schema'

export interface IFeatureValue {
  value: string
  feature: Schema.Types.ObjectId
  products: Schema.Types.ObjectId[]
}
export interface IFeatureValueMethods {}
export interface FeatureValueModel
  extends Model<IFeatureValue, {}, IFeatureValueMethods> {}

const FeatureValue = model<IFeatureValue, FeatureValueModel>(
  'FeatureValue',
  FeatureValueSchema
)
export default FeatureValue
