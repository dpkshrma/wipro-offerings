import { Content, PageWithHeader } from "@backstage/core-components";
import { CatalogTable } from "@backstage/plugin-catalog";
import {
  EntityKindPicker,
  EntityLifecyclePicker,
  EntityListProvider,
  EntityOwnerPicker,
  EntityTagPicker,
} from "@backstage/plugin-catalog-react";
import React from "react";
import { PickerFilter } from "./PickerFilter";
import { Grid } from "@material-ui/core";

export const CustomCatalogIndexPage = () => {
  return (
    <PageWithHeader title="Wipro Offerings" themeId="home">
      <EntityListProvider>
        <Content>
          <Grid container spacing={2}>
            <EntityKindPicker initialFilter="Component" hidden />
            <Grid item xs={2}>
              <PickerFilter
                title="Business Unit"
                entityRefField="spec.type"
                filterName="businessUnits"
              />
            </Grid>
            <Grid item xs={2}>
              <PickerFilter
                title="Practice Line"
                entityRefField="spec.system"
                filterName="practiceLines"
              />
            </Grid>
            <Grid item xs={2}>
              <EntityTagPicker showCounts />
            </Grid>
            <Grid item xs={2}>
              <EntityOwnerPicker />
            </Grid>
            <Grid item xs={2}>
              <EntityLifecyclePicker />
            </Grid>
          </Grid>
          <CatalogTable columns={undefined} actions={[]}  />
        </Content>
      </EntityListProvider>
    </PageWithHeader>
  );
};
