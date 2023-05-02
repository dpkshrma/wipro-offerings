/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  DEFAULT_NAMESPACE
} from '@backstage/catalog-model';
import {
  HeaderIconLinkRow,
  IconLinkVerticalProps,
  InfoCardVariants
} from '@backstage/core-components';
import {
  createExternalRouteRef,
  useApi,
  useRouteRef
} from '@backstage/core-plugin-api';
import {
  ScmIntegrationIcon,
  scmIntegrationsApiRef
} from '@backstage/integration-react';
import {
  getEntitySourceLocation,
  useEntity
} from '@backstage/plugin-catalog-react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider, makeStyles
} from '@material-ui/core';
import DocsIcon from '@material-ui/icons/Description';
import React from 'react';
import { AboutContent } from './AboutContent';

const viewTechDocRouteRef = createExternalRouteRef({
  id: 'view-techdoc',
  optional: true,
  params: ['namespace', 'kind', 'name'],
});

const useStyles = makeStyles({
  gridItemCard: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 10px)', // for pages without content header
    marginBottom: '10px',
  },
  fullHeightCard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  gridItemCardContent: {
    flex: 1,
  },
  fullHeightCardContent: {
    flex: 1,
  },
});

/**
 * Props for {@link EntityAboutCard}.
 *
 * @public
 */
export interface AboutCardProps {
  variant?: InfoCardVariants;
}

/**
 * Exported publicly via the EntityAboutCard
 */
export function AboutCard(props: AboutCardProps) {
  const { variant } = props;
  const classes = useStyles();
  const { entity } = useEntity();
  const scmIntegrationsApi = useApi(scmIntegrationsApiRef);
  // const catalogApi = useApi(catalogApiRef);
  // const alertApi = useApi(alertApiRef);
  // const errorApi = useApi(errorApiRef);
  const viewTechdocLink = useRouteRef(viewTechDocRouteRef);

  const entitySourceLocation = getEntitySourceLocation(
    entity,
    scmIntegrationsApi,
  );

  const viewInSource: IconLinkVerticalProps = {
    label: 'View Source',
    disabled: !entitySourceLocation,
    icon: <ScmIntegrationIcon type={entitySourceLocation?.integrationType} />,
    href: entitySourceLocation?.locationTargetUrl,
  };
  const viewInTechDocs: IconLinkVerticalProps = {
    label: 'View TechDocs',
    disabled:
      !entity.metadata.annotations?.['backstage.io/techdocs-ref'] ||
      !viewTechdocLink,
    icon: <DocsIcon />,
    href:
      viewTechdocLink &&
      viewTechdocLink({
        namespace: entity.metadata.namespace || DEFAULT_NAMESPACE,
        kind: entity.kind,
        name: entity.metadata.name,
      }),
  };

  let cardClass = '';
  if (variant === 'gridItem') {
    cardClass = classes.gridItemCard;
  } else if (variant === 'fullHeight') {
    cardClass = classes.fullHeightCard;
  }

  let cardContentClass = '';
  if (variant === 'gridItem') {
    cardContentClass = classes.gridItemCardContent;
  } else if (variant === 'fullHeight') {
    cardContentClass = classes.fullHeightCardContent;
  }

  // const entityLocation = entity.metadata.annotations?.[ANNOTATION_LOCATION];
  // Limiting the ability to manually refresh to the less expensive locations
  // const allowRefresh =
  //   entityLocation?.startsWith('url:') || entityLocation?.startsWith('file:');
  // const refreshEntity = useCallback(async () => {
  //   try {
  //     await catalogApi.refreshEntity(stringifyEntityRef(entity));
  //     alertApi.post({ message: 'Refresh scheduled', severity: 'info' });
  //   } catch (e) {
  //     // @ts-ignore
  //     errorApi.post(e);
  //   }
  // }, [catalogApi, alertApi, errorApi, entity]);

  return (
    <Card className={cardClass}>
      <CardHeader
        title="About"
        // action={
        //   <>
        //     {allowRefresh && (
        //       <IconButton
        //         aria-label="Refresh"
        //         title="Schedule entity refresh"
        //         onClick={refreshEntity}
        //       >
        //         <CachedIcon />
        //       </IconButton>
        //     )}
        //     <IconButton
        //       component={Link}
        //       aria-label="Edit"
        //       disabled={!entityMetadataEditUrl}
        //       title="Edit Metadata"
        //       to={entityMetadataEditUrl ?? '#'}
        //     >
        //       <EditIcon />
        //     </IconButton>
        //   </>
        // }
        subheader={<HeaderIconLinkRow links={[
          viewInSource,
          viewInTechDocs
        ]} />}
      />
      <Divider />
      <CardContent className={cardContentClass}>
        <AboutContent entity={entity} />
      </CardContent>
    </Card>
  );
}