import { Box, Container, Fab, Typography } from '@mui/material';

import AsyncSearchField from '@components/elements/Fields/AsyncSearchField';

import useStore from '@zustand/store';

import fetchSearchPredicate from '@services/api/fetchSearchPredicate';

export default function Home() {
  const renderMode = useStore((state) => state.renderMode);
  const changeRenderMode = useStore((state) => state.changeRenderMode);

  const handleOnClick = () => {
    changeRenderMode(renderMode === 'SSG' ? 'SSR' : 'SSG');
  };

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

        <Fab
          color="primary"
          variant="extended"
          aria-label="change-rendering-mode"
          onClick={handleOnClick}
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
        >
          Current: {renderMode}
        </Fab>
      </Container>
    </Box>
  );
}
