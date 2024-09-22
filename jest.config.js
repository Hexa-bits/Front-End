// jest.config.js
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    // Ignora archivos CSS, SCSS, LESS
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};