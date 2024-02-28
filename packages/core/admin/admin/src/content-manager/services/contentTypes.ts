import { Contracts } from '@strapi/plugin-content-manager/_internal/shared';

import { contentManagerApi } from './api';

const contentTypesApi = contentManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getContentTypeConfiguration: builder.query<
      Contracts.ContentTypes.FindContentTypeConfiguration.Response['data'],
      string
    >({
      query: (uid) => ({
        url: `/content-manager/content-types/${uid}/configuration`,
        method: 'GET',
      }),
      transformResponse: (response: Contracts.ContentTypes.FindContentTypeConfiguration.Response) =>
        response.data,
      providesTags: (_result, _error, uid) => [
        { type: 'ContentTypesConfiguration', id: uid },
        { type: 'ContentTypeSettings', id: 'LIST' },
      ],
    }),
    getAllContentTypeSettings: builder.query<
      Contracts.ContentTypes.FindContentTypesSettings.Response['data'],
      void
    >({
      query: () => '/content-manager/content-types-settings',
      transformResponse: (response: Contracts.ContentTypes.FindContentTypesSettings.Response) =>
        response.data,
      providesTags: [{ type: 'ContentTypeSettings', id: 'LIST' }],
    }),
    updateContentTypeConfiguration: builder.mutation<
      Contracts.ContentTypes.UpdateContentTypeConfiguration.Response['data'],
      Contracts.ContentTypes.UpdateContentTypeConfiguration.Request['body'] & {
        uid: string;
      }
    >({
      query: ({ uid, ...body }) => ({
        url: `/content-manager/content-types/${uid}/configuration`,
        method: 'PUT',
        data: body,
      }),
      transformResponse: (
        response: Contracts.ContentTypes.UpdateContentTypeConfiguration.Response
      ) => response.data,
      invalidatesTags: (_result, _error, { uid }) => [
        { type: 'ContentTypesConfiguration', id: uid },
        { type: 'ContentTypeSettings', id: 'LIST' },
        // Is this necessary?
        { type: 'InitialData' },
      ],
    }),
  }),
});

const {
  useGetContentTypeConfigurationQuery,
  useGetAllContentTypeSettingsQuery,
  useUpdateContentTypeConfigurationMutation,
} = contentTypesApi;

export {
  useGetContentTypeConfigurationQuery,
  useGetAllContentTypeSettingsQuery,
  useUpdateContentTypeConfigurationMutation,
};