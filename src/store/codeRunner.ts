import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeRequestExtraReducer, makeRequestStateProperty, RequestList, RequestStateProperty } from './helpers';
import { runCode } from '~/api/codeRunnerFakeApi';

const SLICE_NAME = 'codeRunner';

interface IS {
  codeRunRequest: RequestStateProperty<string, string>;
}

const initialState: IS = {
  codeRunRequest: makeRequestStateProperty<string, string>(),
};

const { actions, reducer, selectors } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, codeRunThunk, 'codeRunRequest');
  },
});

interface CodeRunThunkPayload {
  code: string;
  language: string;
  isError: boolean;
}

const codeRunThunk = createAsyncThunk(
  `SLICE_NAME/fetchCommentsThunk`,
  async ({ code, isError, language }: CodeRunThunkPayload, store) => {
    try {
      const res = await runCode(code, language, isError);
      if (res.status === 'success') {
        return store.fulfillWithValue(res.output);
      }
      if (res.status === 'error') {
        throw new Error(res.error);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        return store.rejectWithValue(e.message);
      }
      return store.rejectWithValue('unknown error');
    }
  },
);

export const codeRunnerSlice = { actions, selectors, thunks: { fetchCommentsThunk: codeRunThunk } } as const;

export const codeRunnerReducer = reducer;
