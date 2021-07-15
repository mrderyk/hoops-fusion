module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.tsx?$': 'ts-jest',
    '\\.svg': './svgTransform.js'
  },
  verbose: true,
}
