import { Schema } from 'mongoose'
import { FeatureModel, IFeature, IFeatureMethods } from './feature.model'

const FeatureSchema = new Schema<IFeature, FeatureModel, IFeatureMethods>(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  },
  {}
)

FeatureSchema.virtual('values', {
  ref: 'FeatureValue',
  localField: '_id',
  foreignField: 'feature',
})

export default FeatureSchema
