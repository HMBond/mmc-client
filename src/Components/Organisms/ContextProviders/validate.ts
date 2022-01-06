import { ModuleInterface, Module } from '../../../types/modules';
import { View } from '../../../types/view';

export function validate(item: ModuleInterface | View) {
  if (item instanceof Module) validateModule(item);
  if (item instanceof View) validateView(item);

  function validateModule(module: Module) {
    // TODO: use validation library
  }

  function validateView(view: View) {
    // TODO: use validation library
  }
}
