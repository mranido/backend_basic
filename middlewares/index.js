const validFields = require("./validate-fields");
const validJWT = require("./validate-jwt");
const validRols = require("./validate-rol");

module.exports = {
  ...validFields,
  ...validJWT,
  ...validRols,
};
