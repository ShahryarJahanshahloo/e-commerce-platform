import { Schema } from 'mongoose'
import {
  FeatureValueModel,
  IFeatureValue,
  IFeatureValueMethods,
} from './featureValue.model'

const FeatureValueSchema = new Schema<
  IFeatureValue,
  FeatureValueModel,
  IFeatureValueMethods
>(
  {
    value: {
      type: String,
      required: true,
      trim: true,
      maxlength: 511,
    },
    feature: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Feature',
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {}
)

export default FeatureValueSchema
