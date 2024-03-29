const validationRulesMaker = (func) => ({
  username: {
    required: 'This field is required',
    minLength: {
      value: 3,
      message: 'Your username needs to be at least 3 characters',
    },
    maxLength: {
      value: 20,
      message: 'Your username needs to be less than 20 characters',
    },
  },
  email: {
    required: 'This field is required',
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Enter the valid email',
    },
  },
  password: {
    required: 'This field is required',
    minLength: {
      value: 6,
      message: 'Your password needs to be at least 6 characters',
    },
    maxLength: {
      value: 40,
      message: 'Your password needs to be less than 40 characters',
    },
  },
  repeatPassword: {
    required: 'This field is required',
    validate: (value) => value === func('password') || 'Passwords must match',
  },
  imageUrl: {
    pattern: {
      value: /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/,
      message: 'Enter URL of image',
    },
  },
})

export default validationRulesMaker
