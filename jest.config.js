module.exports = {
	"preset": "@shelf/jest-mongodb"
}
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	verbose: true,
  };
  
  module.exports = config;
  
  // Or async function
  module.exports = async () => {
	return {
	  verbose: true,
	};
  };