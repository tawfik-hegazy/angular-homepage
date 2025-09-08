import { CanDeactivateFn } from '@angular/router';
import { canComponentDeactivate } from '../models/can-component-deactivate';

export const unsavedChangesGuard: CanDeactivateFn<canComponentDeactivate> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.hasUnsavedChanges ? window.confirm('Discard changes ?') : true;
};
