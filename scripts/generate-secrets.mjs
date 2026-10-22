import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const envPath = path.join(root, '.env.local');
const outputPath = path.join(root, 'src/environments/secrets.ts');

function readLocalEnv(filePath) {
  if (!fs.existsSync(filePath)) { return {}; }
  return fs.readFileSync(filePath, 'utf8').split(/\r?\n/).reduce((values, line) => {
    const clean = line.trim();
    if (!clean || clean.startsWith('#')) { return values; }
    const separator = clean.indexOf('=');
    if (separator < 1) { return values; }
    const key = clean.slice(0, separator).trim();
    let value = clean.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value;
    return values;
  }, {});
}

const local = readLocalEnv(envPath);
const apiReadToken = process.env.PRODV_API_READ_TOKEN || local.PRODV_API_READ_TOKEN || '';
const source = `// Archivo generado automáticamente. No subir a Git.\nexport const localSecrets = {\n  apiReadToken: ${JSON.stringify(apiReadToken)}\n};\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, source, { encoding: 'utf8', mode: 0o600 });
console.log(apiReadToken ? 'Configuración local generada con token de lectura.' : 'Configuración local generada sin token; se usará el respaldo de desarrollo.');
