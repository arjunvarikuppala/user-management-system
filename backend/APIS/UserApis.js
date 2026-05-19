import exp from 'express'
import { isValidObjectId } from 'mongoose'
import { UserModel } from '../model/userModel.js'
export const userApp = exp.Router()

function createHttpError(statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

function ensureValidId(userId) {
  if (!isValidObjectId(userId)) {
    throw createHttpError(400, 'Invalid ID format')
  }
}

async function findUserById(userId) {
  ensureValidId(userId)

  const user = await UserModel.findById(userId)

  if (!user) {
    throw createHttpError(404, 'User not found with the given id')
  }

  return user
}

userApp.post(['/user', '/users'], async (req, res) => {
  const createdUser = await UserModel.create(req.body)

  res.status(201).json({
    message: 'User added successfully',
    payload: createdUser
  })
})

userApp.get('/users', async (req, res) => {
  const users = await UserModel.find({ status: true })
    .sort({ createdAt: -1 })
    .lean()

  res.status(200).json({
    message: 'Users fetched successfully',
    payload: users
  })
})

userApp.get('/users/:id', async (req, res) => {
  const user = await findUserById(req.params.id)

  if (!user.status) {
    throw createHttpError(404, 'User is inactive')
  }

  res.status(200).json({
    message: 'User fetched successfully',
    payload: user
  })
})

userApp.delete('/users/:id', async (req, res) => {
  const user = await findUserById(req.params.id)

  if (!user.status) {
    throw createHttpError(409, 'User is already inactive')
  }

  user.status = false
  await user.save()

  res.status(200).json({
    message: 'User removed successfully',
    payload: {
      id: user._id,
      name: user.name
    }
  })
})

userApp.patch('/users/:id', async (req, res) => {
  const user = await findUserById(req.params.id)
  const nextStatus = typeof req.body.status === 'boolean' ? req.body.status : true

  user.status = nextStatus
  await user.save()

  res.status(200).json({
    message: nextStatus ? 'User activated successfully' : 'User deactivated successfully',
    payload: {
      id: user._id,
      name: user.name,
      status: user.status
    }
  })
})
