import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		cart: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Cart'
			}
		]
	},
	{ timestamps: true }
)

export default mongoose.model('User', UserSchema)
