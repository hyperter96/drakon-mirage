import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-require-imports": "error",
    }
  },
  
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/exhaustive-deps": "warn",
    }
  },
  
  {
    ignores: [
      ".next/**",
      "dist/**",
      "build/**",
      "out/**",
      "node_modules/**",
      "**/*.d.ts",
      "public/**",
      "*.config.js",
      "*.config.mjs",
      "next-env.d.ts",
      ".vercel/**"
    ]
  }
];

export default eslintConfig;
