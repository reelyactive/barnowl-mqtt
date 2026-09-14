import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

/*
 * Reference: https://github.com/reelyactive/javascript-style-guide
 */
export default defineConfig([
  {
    files: [ "**/*.js" ],
    languageOptions: {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "globals": { ...globals.node } // globals.node and/or globals.browser
    },
    plugins: {
      "js": js,
      "@stylistic": stylistic
    },
    extends: [ "js/recommended" ],
    rules: {
      "no-unused-vars": "warn",
      "max-len": [ "warn", {
        "code": 80,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true
      }],
      "@stylistic/indent": [ "error", 2, {
        "FunctionDeclaration": { "parameters": "first" },
        "CallExpression": { "arguments": "first" }
      }],
      "@stylistic/no-tabs": "error",
      "@stylistic/semi": [ "error", "always" ],
      "@stylistic/space-before-function-paren": [ "error", "never" ],
      "@stylistic/space-before-blocks": [ "error", "always" ],
      "@stylistic/brace-style": [ "error", "stroustrup", {
        "allowSingleLine": true
      }],
      "@stylistic/object-curly-spacing": [ "error", "always" ],
      "@stylistic/array-bracket-spacing": [ "error", "always", {
        "objectsInArrays": false,
        "arraysInArrays": false
      }],
      "@stylistic/function-call-spacing": [ "error", "never" ],
      "@stylistic/comma-spacing": "error",
      "@stylistic/key-spacing": "error",
      "@stylistic/arrow-spacing": "error",
      "@stylistic/arrow-parens": [ "error", "always" ],
      "@stylistic/quotes": [ "error", "double", {
        "allowTemplateLiterals": "always"
      }],
      "@stylistic/dot-location": [ "error", "property" ],
      "@stylistic/no-extra-semi": "error",
      "@stylistic/no-multi-spaces": [ "error", {
        "ignoreEOLComments": true
      }],
      "@stylistic/no-multiple-empty-lines": "error",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/eol-last": [ "error", "always" ]
    }
  }
]);
