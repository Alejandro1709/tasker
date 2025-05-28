import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  password: string
  role: string
  comparePasswords: (
    enteredPassword: string,
    hashedPassword: string
  ) => Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(12)

  this.password = await bcrypt.hash(this.password, salt)

  next()
})

userSchema.methods.comparePasswords = async function (
  enteredPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(enteredPassword, hashedPassword)
}

const User = mongoose.model('User', userSchema)

export default User
