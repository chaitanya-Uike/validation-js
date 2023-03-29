function resolvePath(rootSchema, path) {
  let schema = rootSchema;
  return path.reduce((acc, currPath) => {
    return acc[currPath];
  }, schema);
}

function resolveDependancy(schema, globalCtx) {
  const remote_refs = [];
  // if schema is already resolved return
  if (globalCtx.$def.hasOwnProperty(schema.id)) return remote_refs;

  // add schema to globalCtx to mark it as resolved
  globalCtx.$def[schema.id] = schema;

  if (schema.type === "local_ref") {
    const referencedSchema = resolvePath(globalCtx.root, schema.path);
    const sub_remote_refs = resolveDependancy(referencedSchema, globalCtx);
    remote_refs.push(...sub_remote_refs);
  } else if (schema.type === "remote_ref") {
    remote_refs.push(schema.ref_id);
  } else if (schema.type === "object") {
    // recursively resolve properties
    schema.properties.forEach((subSchema) => {
      const sub_remote_refs = resolveDependancy(subSchema, globalCtx);
      remote_refs.push(...sub_remote_refs);
    });
  } else if (schema.type === "array") {
    if (schema.items) {
      const items_remote_ref = resolveDependancy(schema.items, globalCtx);
      remote_refs.push(...items_remote_ref);
    }
  }

  return remote_refs;
}

function build(schema) {
  const globalCtx = {
    $def: {},
    root: schema,
  };

  $build(schema, globalCtx);

  return globalCtx;
}

function $build(schema, globalCtx) {
  const remote_refs = resolveDependancy(schema, globalCtx);

  // query database
  const remote_schemas = [];

  remote_schemas.forEach((remoteSchema) => {
    $build(remoteSchema, globalCtx);
  });
}

export default build;
