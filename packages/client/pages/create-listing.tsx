import { textPageSchema } from '@airbnb-clone/common';
import {
  CreateListingController,
  ListingFormProps,
  useIsAuth,
} from '@airbnb-clone/controller';
import { Button, Form, Layout, Select, Steps } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AmenitiesPage } from '../modules/listing-pages/AmenitiesPage';
import { NumberPage } from '../modules/listing-pages/NumberPage';
import { TextPage } from '../modules/listing-pages/TextPage';
import { formItemLayout, tailFormItemLayout } from '../styles/formStyles';
import { withApollo } from '../utils/withApollo';

const { Content } = Layout;
const { Option } = Select;
const { Step } = Steps;

interface CreateListingProps {}

const CreateListing: React.FC<CreateListingProps> = ({}) => {
  useIsAuth();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<ListingFormProps>({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(textPageSchema),
  });
  console.log(errors.title?.message);
  const pages = [
    {
      title: 'General',
      content: <TextPage control={control} errors={errors.title?.message} />,
    },
    {
      title: 'Details',
      content: <NumberPage control={control} errors={errors.price?.message} />,
    },
    {
      title: 'More Details',
      content: (
        <AmenitiesPage control={control} errors={errors.longitude?.message} />
      ),
    },
  ];

  const [currPage, setCurrPage] = useState(0);

  const nextPage = () => {
    setCurrPage(currPage + 1);
  };

  const prevPage = () => {
    setCurrPage(currPage - 1);
  };

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i} value={i.toString(36) + i}>
        {i.toString(36) + i}
      </Option>
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
            <Form
              {...formItemLayout}
              name='listing'
              onFinish={handleSubmit((data) => submit(data))}
              scrollToFirstError
              style={{ width: '100%' }}
            >
              <Steps current={currPage} style={{ marginBottom: 10 }}>
                {pages.map((page) => (
                  <Step key={page.title} title={page.title} />
                ))}
              </Steps>
              <div style={{ maxWidth: '600px', paddingTop: 60 }}>
                {pages[currPage].content}
              </div>

              <Form.Item {...tailFormItemLayout}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {currPage < pages.length - 1 && (
                    <Button
                      type='primary'
                      onClick={nextPage}
                      disabled={!isDirty || !isValid}
                    >
                      Next
                    </Button>
                  )}
                  {currPage === pages.length - 1 && (
                    <Button
                      type='primary'
                      htmlType='submit'
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
              </Form.Item>
            </Form>
          )}
        </CreateListingController>
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreateListing);
