import React, { useMemo } from "react";
import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { EntityFilter, getEntityFilter } from "./EntityFilter";
import { DefaultEntityFilters, useEntityList } from "@backstage/plugin-catalog-react";
import { Entity } from "@backstage/catalog-model";
import { get } from "lodash";

export type CustomFilters = DefaultEntityFilters & {
  [filterName: string]: EntityFilter;
};

interface PickerFilterProps {
  title: string;
  entityRefField: string;
  options?: string[];
  filterName: string;
}

export const PickerFilter: React.FC<PickerFilterProps> = (props) => {
  // The offerings key is recognized due to the CustomFilter generic
  const {
    filters,
    updateFilters,
    backendEntities
  } = useEntityList<CustomFilters>();

  const items = filters[props.filterName];

  // Toggles the value, depending on whether it's already selected
  function onChange(newItems: string[]) {
    updateFilters({
      [props.filterName]: newItems.length
        ? getEntityFilter(props.entityRefField, newItems)
        : undefined,
    });
  }

  const availableEntities = useMemo(
    () =>
      [
        ...new Set(
          backendEntities
            .map((e: Entity) => get(e, props.entityRefField))
            .filter(Boolean) as string[],
        ),
      ].sort(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [backendEntities],
  );

  // eslint-disable-next-line no-console
  return (
    <Box pb={1} pt={1}>
      <Typography variant="button" component="label">
        {props.title}
        <Autocomplete
          multiple
          disableCloseOnSelect
          options={availableEntities}
          value={(items?.values || []) as string[]}
          onChange={(_: object, value: string[]) => {
            onChange(value)
          }}
          renderOption={(option, { selected }) => (
            <FormControlLabel
              control={
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  checked={selected}
                />
              }
              onClick={event => event.preventDefault()}
              label={option}
            />
          )}
          size="small"
          popupIcon={<ExpandMoreIcon data-testid="lifecycle-picker-expand" />}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
            />
          )}
        />
      </Typography>
    </Box>
  );
};