import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export const root = process.cwd();
export const metadataDir = path.join(root, "scripts/registry/metadata");
export const registryKinds = [
  "blocks",
  "pages",
  "emails",
  "canvases",
  "layouts",
  "components",
  "pieces",
];
const metadataFields = new Set([
  "title",
  "description",
  "category",
  "tags",
  "dependencies",
]);
export async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

export async function listJsonFiles(dir = metadataDir) {
  const files = [];

  async function visit(current) {
    const entries = await readdir(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await visit(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name.endsWith(".json")) {
        files.push(fullPath);
      }
    }
  }

  try {
    await visit(dir);
  } catch {
    return [];
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function metadataLocation(file) {
  const [kind, domainFile, ...extra] = path
    .relative(metadataDir, file)
    .split(path.sep);
  return {
    kind,
    domain: domainFile?.replace(/\.json$/, ""),
    extra,
  };
}

function validateMetadataKey(key, file) {
  const [kind, name, extra] = key.split(":");
  const location = metadataLocation(file);

  if (extra || !registryKinds.includes(kind) || !name) {
    throw new Error(`Invalid metadata key ${JSON.stringify(key)} in ${file}`);
  }

  if (kind !== location.kind) {
    throw new Error(
      `Metadata key ${JSON.stringify(key)} must live under ${kind}/, not ${location.kind}/`,
    );
  }

  if (!location.domain || location.extra.length > 0) {
    throw new Error(
      `Metadata file ${file} must live directly under scripts/registry/metadata/${kind}/`,
    );
  }
}

function validateStringField(
  value,
  field,
  key,
  file,
  { required = false } = {},
) {
  if (value === undefined && !required) return;

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(
      `Metadata ${key}.${field} must be a non-empty string in ${file}`,
    );
  }
}

function validateStringArrayField(
  value,
  field,
  key,
  file,
  { required = false } = {},
) {
  if (value === undefined && !required) return;

  if (
    !Array.isArray(value) ||
    value.some((item) => typeof item !== "string" || !item.trim())
  ) {
    throw new Error(
      `Metadata ${key}.${field} must be an array of non-empty strings in ${file}`,
    );
  }
}

function validateMetadataValue(key, value, file) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Metadata ${key} must be an object in ${file}`);
  }

  for (const field of Object.keys(value)) {
    if (!metadataFields.has(field)) {
      throw new Error(`Unknown metadata field ${key}.${field} in ${file}`);
    }
  }

  validateStringField(value.title, "title", key, file, { required: true });
  validateStringField(value.description, "description", key, file, {
    required: true,
  });
  validateStringField(value.category, "category", key, file, {
    required: true,
  });
  validateStringArrayField(value.tags, "tags", key, file, { required: true });
  validateStringArrayField(value.dependencies, "dependencies", key, file);
}

export async function collectRegistryMetadata() {
  const metadata = new Map();
  const keyFiles = new Map();

  for (const metadataFile of await listJsonFiles(metadataDir)) {
    const overrides = await readJson(metadataFile);

    for (const [key, value] of Object.entries(overrides)) {
      validateMetadataKey(key, metadataFile);
      validateMetadataValue(key, value, metadataFile);

      if (keyFiles.has(key)) {
        throw new Error(
          `Duplicate metadata key ${JSON.stringify(key)} in ${metadataFile} and ${keyFiles.get(key)}`,
        );
      }

      keyFiles.set(key, metadataFile);
      metadata.set(key, value);
    }
  }

  return metadata;
}

export async function metadataNamesForKind(kind) {
  const names = new Set();
  const metadata = await collectRegistryMetadata();

  for (const key of metadata.keys()) {
    if (key.startsWith(`${kind}:`)) {
      names.add(key.slice(kind.length + 1).toLowerCase());
    }
  }

  return names;
}
