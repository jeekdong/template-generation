const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        node: true
      },
      useBuiltIns: "usage",
    },
  ],
]

module.exports = { presets }