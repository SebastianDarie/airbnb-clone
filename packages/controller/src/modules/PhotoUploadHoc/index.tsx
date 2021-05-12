import React from 'react';
import {
  UploadPhotoMutationFn,
  useUploadPhotoMutation,
} from '../../generated/graphql';

export interface WithPhotoUploadProps {
  uploadPhoto: UploadPhotoMutationFn;
}

export function withPhotoUpload<ComponentProps>(
  WrappedComponent: React.ComponentType<ComponentProps & WithPhotoUploadProps>
) {
  return (props: ComponentProps) => {
    const [uploadPhoto] = useUploadPhotoMutation();

    return <WrappedComponent {...props} uploadPhoto={uploadPhoto} />;
  };
}
