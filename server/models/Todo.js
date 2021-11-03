import { Schema } from 'mongoose'

export const TodoSchema = new Schema({
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  tag: { type: String, enum: ['chore', 'groceries'] },
  creatorId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

TodoSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
