import type { RootState } from '@/app/providers/StoreProvider/config/store';

export const getStepFormState = (state: RootState) => state.authenticationFormSlice.stepForm;
