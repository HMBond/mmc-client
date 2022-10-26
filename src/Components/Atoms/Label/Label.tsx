import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function Label({ children }: PropsWithChildren<any>) {
  return <Typography component="label">{children}</Typography>;
}
