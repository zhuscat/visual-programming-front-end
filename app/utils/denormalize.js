// TODO: 将函数改成没有副作用的
/**
 * 正在把函数改成无副作用的，这里给出一些记录
 * value 就是一个程序模块，不要去修改 value
 */
function denormalize2(value, entities) {
  const target = {
    ...value,
  };
  let condition = {};
  const procedure = [];
  if (!value) {
    console.log('遇到 value 为空的情况？');
    return {};
  }
  if (('first' in target) && ('firstType' in target) && target.firstType === 'VAR') {
    // 这里我要把需求问清楚
    // 如果一个引用消失了，我生成那个值是多少
    if (entities[target.first]) {
      target.first = entities[target.first].name;
    } else {
      target.first = '';
    }
  }
  if (('second' in target) && ('secondType' in target) && target.secondType === 'VAR') {
    if (entities[target.second]) {
      target.second = entities[target.second].name;
    } else {
      target.second = '';
    }
  }
  if (target.assignValue) {
    target.assignValue = entities[target.assignValue].name;
  }
  if (!('condition' in target) || !('procedure' in target)) {
    return target;
  }
  if (target.condition in entities) {
    condition = denormalize2(entities[target.condition], entities);
  }

  for (const v of target.procedure) {
    if (v in entities) {
      procedure.push(denormalize2(entities[v], entities));
    }
  }

  target.condition = condition;
  target.procedure = procedure;

  return target;
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
