import { EntityRefLinks } from "@backstage/plugin-catalog-react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, makeStyles } from "@material-ui/core";
import React from "react";


const useStyles = makeStyles(theme => ({
  label: {
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

export interface TaxonomyTableProps {
  data: {
    level3: string;
    level4: string;
    level5: string;
    level6: string;
  }
}

export const TaxonomyTable: React.FC<TaxonomyTableProps> = ({ data }) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Typography variant="h2" className={classes.label}>
        Taxonomy
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Level</TableCell>
            <TableCell>Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>
              <EntityRefLinks entityRefs={[{
                name: data.level3,
                kind: 'user',
                namespace: 'default'
              }]} defaultKind="user" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>
              <EntityRefLinks entityRefs={[{
                name: data.level4,
                kind: 'user',
                namespace: 'default'
              }]} defaultKind="user" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>5</TableCell>
            <TableCell>
              <EntityRefLinks entityRefs={[{
                name: data.level5,
                kind: 'user',
                namespace: 'default'
              }]} defaultKind="user" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>6</TableCell>
            <TableCell>
              <EntityRefLinks entityRefs={[{
                name: data.level6,
                kind: 'user',
                namespace: 'default'
              }]} defaultKind="user" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
};
