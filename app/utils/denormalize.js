function denormalize2(value, entities) {
  const condition = [];
  const procedure = [];
  if (('first' in value) && ('firstType' in value) && value.firstType === 'VAR') {
    value.first = entities[value.first].name;
  }
  if (('second' in value) && ('secondType' in value) && value.secondType === 'VAR') {
    value.second = entities[value.second].name;
  }
  if (value.assgin) {
    value.assign = entities[value.assign].name;
  }
  if (!('condition' in value) || !('procedure' in value)) {
    return value;
  }
  for (let v of value.condition) {
    if (v in entities) {
      condition.push(denormalize2(entities[v], entities));
    }
  }

  for (let v of value.procedure) {
    if (v in entities) {
      procedure.push(denormalize2(entities[v], entities))
    }
  }

  value.condition = condition;
  value.procedure = procedure;

  return value;
}

export default function denormalize(data) {
  const denormalized = { variableArea: [], procedureArea: [] };

  for (const v of data.variableArea) {
    if (v in data.entities) {
      denormalized.variableArea.push(data.entities[v]);
    }
  }

  for (const v of data.procedureArea) {
    if (v in data.entities) {
      denormalized.procedureArea.push(denormalize2(data.entities[v], data.entities));
    }
  }

  return denormalized;
}
