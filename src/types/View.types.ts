import PropTypes from 'prop-types';
import { uid } from '../utils/id';

export const ViewPropTypes = PropTypes.shape({
  id: PropTypes.number,
  backgroundColor: PropTypes.string,
});

type ViewConstructorArgs = {
  label?: string;
  backgroundColor?: string;
  moduleIds?: number[];
};

export class View {
  constructor(args: ViewConstructorArgs = {}) {
    const { label, backgroundColor, moduleIds } = args;
    this.id = uid();
    this.label = label || '';
    this.backgroundColor = backgroundColor || 'indigo';
    this.moduleIds = moduleIds || [];
  }
  id: number;
  label: string;
  backgroundColor: string;
  moduleIds: number[];
}
