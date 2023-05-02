import {
  ComponentEntity,
  Entity,
  RELATION_HAS_PART
} from '@backstage/catalog-model';
import { EmptyState, TableColumn } from '@backstage/core-components';
import {
  EntityApiDefinitionCard, EntityConsumingComponentsCard, EntityProvidingComponentsCard
} from '@backstage/plugin-api-docs';
import {
  EntityAboutCard,
  EntityDependsOnComponentsCard,
  EntityDependsOnResourcesCard, EntityHasSystemsCard,
  EntityLayout,
  EntityLinksCard, EntityOrphanWarning,
  EntityProcessingErrorsPanel, EntitySwitch,
  RelatedEntitiesCard,
  hasCatalogProcessingErrors, isComponentType,
  isKind, isOrphan
} from '@backstage/plugin-catalog';
import {
  EntityCatalogGraphCard
} from '@backstage/plugin-catalog-graph';
import {
  EntityGithubActionsContent, isGithubActionsAvailable
} from '@backstage/plugin-github-actions';
import {
  EntityGroupProfileCard,
  EntityMembersListCard,
  EntityOwnershipCard, EntityUserProfileCard
} from '@backstage/plugin-org';
import { Button, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';

import { EntityListProvider, EntityTable, EntityTagPicker } from '@backstage/plugin-catalog-react';
import { AboutCard } from './AboutCard';
import { testFinData } from './test-fin-data';
import HeatMap from './HeatMap';

// const techdocsContent = (
//   <EntityTechdocsContent>
//     <TechDocsAddons>
//       <ReportIssue />
//     </TechDocsAddons>
//   </EntityTechdocsContent>
// );


export const componentEntityColumns: TableColumn<ComponentEntity>[] = [
  EntityTable.columns.createEntityRefColumn({ defaultKind: 'component' }),
  EntityTable.columns.createOwnerColumn(),
  EntityTable.columns.createSpecTypeColumn(),
  EntityTable.columns.createSpecLifecycleColumn(),
  EntityTable.columns.createMetadataDescriptionColumn(),
];
export const componentEntityHelpLink: string =
  'https://backstage.io/docs/features/software-catalog/descriptor-format#kind-component';
export const asComponentEntities = (entities: Entity[]): ComponentEntity[] =>
  entities as ComponentEntity[];


const cicdContent = (
  // This is an example of how you can implement your company's logic in entity page.
  // You can for example enforce that all components of type 'service' should use GitHubActions
  <EntitySwitch>
    <EntitySwitch.Case if={isGithubActionsAvailable}>
      <EntityGithubActionsContent />
    </EntitySwitch.Case>

    <EntitySwitch.Case>
      <EmptyState
        title="No CI/CD available for this entity"
        missing="info"
        description="You need to add an annotation to your component if you want to enable CI/CD for it. You can read more about annotations in Backstage by clicking the button below."
        action={
          <Button
            variant="contained"
            color="primary"
            href="https://backstage.io/docs/features/software-catalog/well-known-annotations"
          >
            Read more
          </Button>
        }
      />
    </EntitySwitch.Case>
  </EntitySwitch>
);

const entityWarningContent = (
  <>
    <EntitySwitch>
      <EntitySwitch.Case if={isOrphan}>
        <Grid item xs={12}>
          <EntityOrphanWarning />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>

    <EntitySwitch>
      <EntitySwitch.Case if={hasCatalogProcessingErrors}>
        <Grid item xs={12}>
          <EntityProcessingErrorsPanel />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
  </>
);

const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
    {entityWarningContent}
    <Grid item md={8}>
      <AboutCard variant="gridItem" />
    </Grid>
    <Grid item md={4} xs={12}>
      <EntityLinksCard />
    </Grid>
  </Grid>
);

const serviceEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    {/* <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/api" title="API">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={6}>
          <EntityProvidedApisCard />
        </Grid>
        <Grid item md={6}>
          <EntityConsumedApisCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>

    <EntityLayout.Route path="/dependencies" title="Dependencies">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={6}>
          <EntityDependsOnComponentsCard variant="gridItem" />
        </Grid>
        <Grid item md={6}>
          <EntityDependsOnResourcesCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route> */}
  </EntityLayout>
);

const websiteEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/dependencies" title="Dependencies">
      <Grid container spacing={3} alignItems="stretch">
        <Grid item md={6}>
          <EntityDependsOnComponentsCard variant="gridItem" />
        </Grid>
        <Grid item md={6}>
          <EntityDependsOnResourcesCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>

    {/* <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route> */}
  </EntityLayout>
);

/**
 * 
 * Number of sold deals
 * deals in pipeline
 * Average deal size
 * Average Margin for deals
 * Time to close deals
 */

const financialsContent = (
  <Grid container>
    <Grid item xs={12}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              S.No.
            </TableCell>
            <TableCell>
              Offering
            </TableCell>
            <TableCell>
              No. of deals sold
            </TableCell>
            <TableCell>
              Average Deal Size
            </TableCell>
            <TableCell>
              Deals in Pipeline
            </TableCell>
            <TableCell>
              Time to close deals
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            testFinData.map((row, idx) => {
              return (
                <TableRow>
                  <TableCell>
                    {idx + 1}
                  </TableCell>
                  <TableCell>
                    {row.offering}
                  </TableCell>
                  <TableCell>
                    {row.dealSoldCount}
                  </TableCell>
                  <TableCell>
                    {row.averageDealSize}
                  </TableCell>
                  <TableCell>
                    {row.dealsInPipeline}
                  </TableCell>
                  <TableCell>
                    {row.timeToCloseDeals}
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </Grid>
  </Grid>
);

const heatMapContent = (
  <Grid container>
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title={(
            <Typography variant="h5">
              Industry-based Offerings Heatmap
            </Typography>
          )}
        />
        <CardContent style={{
          overflow: 'scroll',
        }}>
          <HeatMap />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

/**
 * NOTE: This page is designed to work on small screens such as mobile devices.
 * This is based on Material UI Grid. If breakpoints are used, each grid item must set the `xs` prop to a column size or to `true`,
 * since this does not default. If no breakpoints are used, the items will equitably share the available space.
 * https://material-ui.com/components/grid/#basic-grid.
 */

const defaultEntityPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      {overviewContent}
    </EntityLayout.Route>
    {/* <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route> */}
  </EntityLayout>
);

const componentPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isComponentType('service')}>
      {serviceEntityPage}
    </EntitySwitch.Case>

    <EntitySwitch.Case if={isComponentType('website')}>
      {websiteEntityPage}
    </EntitySwitch.Case>

    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);

const apiPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3}>
        {entityWarningContent}
        <Grid item md={6}>
          <EntityAboutCard />
        </Grid>
        <Grid item md={6} xs={12}>
          <EntityCatalogGraphCard variant="gridItem" height={400} />
        </Grid>
        <Grid item md={4} xs={12}>
          <EntityLinksCard />
        </Grid>
        <Grid container item md={12}>
          <Grid item md={6}>
            <EntityProvidingComponentsCard />
          </Grid>
          <Grid item md={6}>
            <EntityConsumingComponentsCard />
          </Grid>
        </Grid>
      </Grid>
    </EntityLayout.Route>

    <EntityLayout.Route path="/definition" title="Definition">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EntityApiDefinitionCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>
  </EntityLayout>
);

const userPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3}>
        {entityWarningContent}
        <Grid item xs={12} md={6}>
          <EntityUserProfileCard variant="gridItem" />
        </Grid>
        <Grid item xs={12} md={6}>
          <EntityOwnershipCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>
  </EntityLayout>
);

const groupPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3}>
        {entityWarningContent}
        <Grid item xs={12} md={6}>
          <EntityGroupProfileCard variant="gridItem" />
        </Grid>
        <Grid item xs={12} md={6}>
          <EntityOwnershipCard variant="gridItem" />
        </Grid>
        <Grid item xs={12}>
          <EntityMembersListCard />
        </Grid>
      </Grid>
    </EntityLayout.Route>
  </EntityLayout>
);

const systemPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3} alignItems="stretch">
        {entityWarningContent}
        <Grid item md={5}>
          <AboutCard variant="gridItem" />
        </Grid>
        {/* <Grid item md={6} xs={12}>
          <EntityLinksCard />
        </Grid> */}
        {/* <Grid item md={4} xs={12}>
          <EntityCatalogGraphCard variant="gridItem" height={400} />
        </Grid> */}
        <Grid item md={7}>
          {/* <EntityHasComponentsCard variant="gridItem" /> */}
          <RelatedEntitiesCard
            variant="gridItem"
            title="Offerings"
            entityKind="Component"
            relationType={RELATION_HAS_PART}
            columns={componentEntityColumns}
            emptyMessage="No component is part of this system"
            emptyHelpLink={componentEntityHelpLink}
            asRenderableEntities={asComponentEntities}
          />
        </Grid>
        {/* <Grid item md={6}>
          <EntityHasApisCard variant="gridItem" />
        </Grid>
        <Grid item md={6}>
          <EntityHasResourcesCard variant="gridItem" />
        </Grid> */}
      </Grid>
    </EntityLayout.Route>
    <EntityLayout.Route path="/financials" title="Financials">
      <Card>
        <CardHeader
          title="Offering Deals"
        />
        <CardContent>
          {financialsContent}
        </CardContent>
      </Card>
    </EntityLayout.Route>
    <EntityLayout.Route path="/heatmap" title="Industry Maps">
      {heatMapContent}
    </EntityLayout.Route>
    {/* <EntityLayout.Route path="/diagram" title="Diagram">
      <EntityCatalogGraphCard
        variant="gridItem"
        direction={Direction.TOP_BOTTOM}
        title="System Diagram"
        height={700}
        relations={[
          RELATION_PART_OF,
          RELATION_HAS_PART,
          RELATION_API_CONSUMED_BY,
          RELATION_API_PROVIDED_BY,
          RELATION_CONSUMES_API,
          RELATION_PROVIDES_API,
          RELATION_DEPENDENCY_OF,
          RELATION_DEPENDS_ON,
        ]}
        unidirectional={false}
      />
    </EntityLayout.Route> */}
  </EntityLayout>
);

const domainPage = (
  <EntityLayout>
    <EntityLayout.Route path="/" title="Overview">
      <Grid container spacing={3} alignItems="stretch">
        {entityWarningContent}
        <Grid item md={6}>
          <EntityAboutCard variant="gridItem" />
        </Grid>
        <Grid item md={6} xs={12}>
          <EntityCatalogGraphCard variant="gridItem" height={400} />
        </Grid>
        <Grid item md={6}>
          <EntityHasSystemsCard variant="gridItem" />
        </Grid>
      </Grid>
    </EntityLayout.Route>
  </EntityLayout>
);

export const entityPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isKind('component')} children={componentPage} />
    <EntitySwitch.Case if={isKind('api')} children={apiPage} />
    <EntitySwitch.Case if={isKind('group')} children={groupPage} />
    <EntitySwitch.Case if={isKind('user')} children={userPage} />
    <EntitySwitch.Case if={isKind('system')} children={systemPage} />
    <EntitySwitch.Case if={isKind('domain')} children={domainPage} />
    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);
