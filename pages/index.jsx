import { Box, Container, Typography } from '@mui/material';

import AsyncSearchField from '@components/elements/Fields/AsyncSearchField';

import { fetchSearchPredicate } from '@services/api';

export default function Home() {
  return (
    <Box component="main">
      <Container>
        <Typography variant="h1" sx={{ textAlign: 'center' }}>
          Countries!
        </Typography>
        <AsyncSearchField
          label="Search"
          placeholder="Country name"
          isOptionEqualToValue={(option, value) => option.cca3 === value.cca3}
          getOptionLabel={(option) => option.name.official}
          fetchController={fetchSearchPredicate}
        />
      </Container>
    </Box>
  );
}
