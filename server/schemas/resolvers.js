const { AuthenticationError } = require('apollo-server-express');
const { User, Pet } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('favorites').populate('pets');
    },

    pets: async () => {
      return Pet.find()
    },
    pet: async (parent, { petId }) => {
      return Pet.findOne({ _id: petId });
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('favorites').populate('pets');
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('favorites')
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addPet: async (parent, { name, description }) => {
      const user = await Pet.create({ name, description, price, quantity, image  });
      const token = signToken(pet);

      return { token, user };
    },
    removePet: async (parent, args, context) => {
      if (context.pet) {
        return Pet.findOneAndDelete({ _id: context.pet._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updatePet: async (parent, args, context) => {
      if (context.user) {
          const petUpdate = await Pet.findByIdAndUpdate(
              { _id: context.pet._id },
              { $addToSet: { updatePet: args.input } },
              { new: true }
          );
          return petUpdate;
      }
      throw new AuthenticationError('LogIn to update users!!!');
  },

    // Add a third argument to the resolver to access data in our `context`
    addFavorite: async (parent, { userId, petId }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { favorites: petId },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Make it so a logged in user can only remove a favorite from their own profile
    removeFavorite: async (parent, { skill }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favorites: favorite } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
