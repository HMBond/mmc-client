import { ModuleModel } from '../../Molecules/Module/Module_model';
import { ViewModel } from '../View/View_model';

export function validate(item: ModuleModel | ViewModel) {
  if (item instanceof ModuleModel) validateModule(item);
  if (item instanceof ViewModel) validateView(item);

  function validateModule(module: ModuleModel) {
    const validId = module.id !== -1;
    if (!validId)
      throw Error(
        "Please set the ModuleModel's id property before updating module..."
      );
  }

  function validateView(view: ViewModel) {
    const validId = view.id !== -1;
    if (!validId)
      throw Error(
        "Please set the ViewModel's id property before updating view..."
      );
  }
}
