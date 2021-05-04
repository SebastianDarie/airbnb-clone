import { textPageSchema } from '@airbnb-clone/common';
import {
  CreateListingController,
  ListingFormProps,
  useIsAuth,
} from '@airbnb-clone/controller';
import { Button, Form, Layout, Steps } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AmenitiesPage } from '../modules/listing-pages/AmenitiesPage';
import { NumberPage } from '../modules/listing-pages/NumberPage';
import { TextPage } from '../modules/listing-pages/TextPage';
import { formItemLayout, tailFormItemLayout } from '../styles/formStyles';
import { withApollo } from '../utils/withApollo';
import {
  CompassTwoTone,
  DollarCircleTwoTone,
  HomeTwoTone,
} from '@ant-design/icons';

const { Content } = Layout;
const { Step } = Steps;

interface CreateListingProps {}

const CreateListing: React.FC<CreateListingProps> = ({}) => {
  useIsAuth();
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<ListingFormProps>({
    mode: 'onBlur',
    resolver: yupResolver(textPageSchema),
  });

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
  const [currImg, setCurrImg] = useState('');

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
          console.log(result.info.secure_url);
          setCurrImg(result.info.secure_url);
          console.log(currImg);
        }
      }
    );
  }

  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <CreateListingController>
          {({ submit }) => (
            <>
              <Form
                {...formItemLayout}
                name='listing'
                onFinish={handleSubmit((data) => submit(data, currImg))}
                scrollToFirstError
                style={{ width: '100%' }}
              >
                <Steps current={currPage} style={{ marginBottom: 10 }}>
                  {pages.map((page) => (
                    <Step
                      key={page.title}
                      title={page.title}
                      icon={page.icon}
                    />
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
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
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
                          loading={isSubmitting}
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
            </>
          )}
        </CreateListingController>
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreateListing);
