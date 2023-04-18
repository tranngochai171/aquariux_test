import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useSearchWeather } from '../../../hooks/useSearch';
import { Heading18 } from '../../Common/Styled/TypographyStyled';
import Control, { CONTROL_TYPE } from '../../ReactHookForm/Control';
import { StyledDivider } from '../WeatherStyled';

const validationSchema = yup.object().shape({
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
});

const SearchSection = () => {
  const { mutate: mutateSearch, isLoading } = useSearchWeather();
  const methods = useForm({
    defaultValues: {
      city: "",
      country: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    mutateSearch(data);
  };
  const onResetValues = () => {
    methods.reset();
  };
  return (
    <Box mb={2}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Heading18>Today's Weather</Heading18>
          <StyledDivider />
          <Stack sx={{ flexDirection: { xs: "column", md: "row" } }} gap={2}>
            <Control
              name="city"
              control={CONTROL_TYPE.INPUT}
              label="City"
              disabled={isLoading}
            />
            <Control
              name="country"
              control={CONTROL_TYPE.INPUT}
              label="Country"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              Search
            </Button>
            <Button type="button" onClick={onResetValues} disabled={isLoading}>
              Clear
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default SearchSection;
