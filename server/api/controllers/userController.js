'use strict'
const mongoose = require('mongoose')
const User = mongoose.model('User')

/**
 * 
 * @param {*} id 
 */
const getUserByUserId = async (id) => {
  try {
    const user = User.findById(id).select('-isDelete -__v')
    return user
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * 
 * @param {*} user 
 */
const createNewUser = async function (user) {
  const newUser = new User({
    email: user.email,
    name: user.name,
    avatarUrl: user.picture.data.url,
    scope: ['USER']
  })
  try {
    const userSaved = await newUser.save()
    return userSaved
  } catch (error) {
    throw Error(error)
  }
}

/**
 * 
 * @param {*} id 
 */
const deleteUser = async function (id) {
  User.findByIdAndRemove(id)
    .then((isDelete) => {
      return 'isDelete'
    })
}

/**
 * 
 * @param {*} email 
 */
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({email})
    return user
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * 
 * @param {*} userId 
 * @param {*} data 
 */
const updateUserByUserId = async (userId, data) => {
  const { about, name, nativeLanguage, userFBId } = data
  try {
    const userUpdate = User.findById(userId).exec()
    userUpdate.then((user) => {
      user.about = about || user.about
      user.name = name || user.name
      user.nativeLanguage = nativeLanguage || user.nativeLanguage
      user.userFBId = userFBId || ''
      user.save()
    })
    return userUpdate
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getUserByUserId,
  createNewUser,
  deleteUser,
  getUserByEmail,
  updateUserByUserId
}
