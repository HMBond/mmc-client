export function updateModule({ Module, setModules, modules }) {
  const otherModules = modules.filter((item) => item.id !== module.id);
  setModules([...otherModules, module]);
}

export function deleteModule({ module, setModules, modules }) {
  const otherModules = modules.filter((item) => item !== module);
  setModules([...otherModules]);
}
