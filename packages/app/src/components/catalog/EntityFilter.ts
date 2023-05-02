import { get } from 'lodash';
import { Entity } from '@backstage/catalog-model';

export interface EntityFilter {
  values: string[];
  filterEntity(entity: Entity): boolean;
}

export interface EntityValueLocation {
  fieldPath: string;
  field: string;
}

export const getEntityFilter = (location: string, values: string[]) => ({
  values,
  filterEntity: (entity: Entity): boolean => {
    const value = get(entity, location);
    return value !== undefined && values.includes(value);
  }
});
