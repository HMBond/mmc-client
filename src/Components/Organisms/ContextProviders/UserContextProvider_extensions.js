export function updateModule({ oldModule, newModule, setModules, modules }) {
  const otherModules = modules.filter((item) => item === oldModule);
  setModules([...otherModules, newModule]);
}

export function deleteModule({ module, setModules, modules }) {
  const otherModules = modules.filter((item) => item === module);
  setModules([...otherModules]);
}
