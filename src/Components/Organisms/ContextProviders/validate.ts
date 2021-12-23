import { ModuleInterface, Module } from '../../../types/Module';
import { View } from '../../../types/View';

export function validate(item: ModuleInterface | View) {
  if (item instanceof Module) validateModule(item);
  if (item instanceof View) validateView(item);

  function validateModule(module: Module) {
    // example
    const validId = module.id !== -1;
    if (!validId)
      throw Error(
        "Please set the ModuleModel's id property before updating module..."
      );
  }

  function validateView(view: View) {
    // example
    const validId = view.id !== -1;
    if (!validId)
      throw Error(
        "Please set the ViewModel's id property before updating view..."
      );
  }
}
