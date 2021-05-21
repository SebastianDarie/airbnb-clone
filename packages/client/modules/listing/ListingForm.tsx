import {
  CreateListingController,
  ListingFormProps,
} from '@airbnb-clone/controller';
import { Button, Form, Steps } from 'antd';
import React, { useState } from 'react';
import {
  Control,
  DeepMap,
  FieldError,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form';
import {
  CompassTwoTone,
  DollarCircleTwoTone,
  HomeTwoTone,
} from '@ant-design/icons';
import { formItemLayout, tailFormItemLayout } from '../../styles/formStyles';
import { TextPage } from './TextPage';
import { NumberPage } from './NumberPage';
import { AmenitiesPage } from './AmenitiesPage';

const { Step } = Steps;

interface ComponentListingFormProps {
  update: boolean
  control: Control<ListingFormProps>;
  errors: DeepMap<ListingFormProps, FieldError>;
  isDirty: boolean;
  isSubmitting: boolean;
  isValid: boolean;
  currImg: string;
  handleSubmit: UseFormHandleSubmit<ListingFormProps>;
  setCurrImg: React.Dispatch<React.SetStateAction<string>>;
  setValue: UseFormSetValue<ListingFormProps>;
}

export const ListingFormView: React.FC<ComponentListingFormProps> = ({
  update,
  control,
  errors,
  
  setCurrImg,
  setValue,
}) => {
  const pages = [
    {
      title: 'General',
      content: (
        <TextPage
          control={control}
          errors={[
            errors.title?.message,
            errors.description?.message,
            errors.category?.message,
          ]}
          setValue={setValue}
        />
      ),
      icon: <HomeTwoTone />,
    },
    {
      title: 'Details',
      content: (
        <NumberPage
          control={control}
          errors={[
            errors.price?.message,
            errors.beds?.message,
            errors.guests?.message,
          ]}
        />
      ),
      icon: <DollarCircleTwoTone />,
    },
    {
      title: 'More Details',
      content: (
        <AmenitiesPage
          control={control}
          errors={[
            errors.latitude?.message,
            errors.longitude?.message,
            errors.amenities?.message,
          ]}
        />
      ),
      icon: <CompassTwoTone />,
    },
  ];

  const [currPage, setCurrPage] = useState(0);

  const nextPage = () => {
    setCurrPage(currPage + 1);
  };

  const prevPage = () => {
    setCurrPage(currPage - 1);
  };

  let widget: any;
  if (typeof window !== 'undefined') {
    widget = (window as any).cloudinary.createUploadWidget(
      {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
        uploadPreset: 'ml_default',
        sources: ['local', 'url', 'camera'],
      },
      (_error: any, result: any) => {
        if (result.event === 'success') {
          setCurrImg(result.info.secure_url);
        }
      }
    );
  }

  return (
    <CreateListingController>
      {({ loading, submit }) => (
        
      )}
    </CreateListingController>
  );
};

// currImg,
//   isDirty,
//   isSubmitting,
//   isValid,
//   handleSubmit,

const ListingForm:React.FC<> = ({}) => {
  <Form
            {...formItemLayout}
            name='listing'
            onFinish={handleSubmit((data) => submit(data, currImg))}
            scrollToFirstError
            style={{ width: '100%' }}
          >
            <Steps current={currPage} style={{ marginBottom: 10 }}>
              {pages.map((page) => (
                <Step key={page.title} title={page.title} icon={page.icon} />
              ))}
            </Steps>
            <div style={{ maxWidth: '600px', paddingTop: 60 }}>
              {pages[currPage].content}
            </div>

            <Form.Item {...tailFormItemLayout}>
              <div
                style={{
                  display: !isDirty || !isValid ? undefined : 'flex',
                  justifyContent:
                    !isDirty || !isValid ? undefined : 'space-between',
                }}
              >
                <Form.Item
                  style={{
                    display: !isDirty || !isValid ? 'none' : '',
                    marginLeft: '200px',
                  }}
                >
                  <Button
                    type='dashed'
                    disabled={!isDirty || !isValid}
                    onClick={() => widget.open()}
                  >
                    Add image
                  </Button>
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {currPage < pages.length - 1 && (
                    <Button type='primary' onClick={nextPage}>
                      Next
                    </Button>
                  )}
                  {currPage === pages.length - 1 && (
                    <Button
                      type='primary'
                      htmlType='submit'
                      disabled={!isDirty || !isValid}
                      loading={loading || isSubmitting}
                    >
                      Create Listing
                    </Button>
                  )}
                  {currPage > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={prevPage}>
                      Previous
                    </Button>
                  )}
                </div>
              </div>
            </Form.Item>
          </Form>
}