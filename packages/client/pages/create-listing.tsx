import Link from 'next/link';
import {
  CreateListingController,
  ListingFormProps,
  useIsAuth,
} from '@airbnb-clone/controller';
import { withApollo } from '../utils/withApollo';
import {
  Layout,
  Form,
  Button,
  Checkbox,
  Select,
  InputNumber,
  Steps,
  message,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { InputField } from '../components/InputField';
import { formItemLayout, tailFormItemLayout } from '../styles/formStyles';
import { TextPage } from '../modules/listing-pages/TextPage';
import { NumberPage } from '../modules/listing-pages/NumberPage';
import { AmenitiesPage } from '../modules/listing-pages/AmenitiesPage';
import { useState } from 'react';

const { Content } = Layout;
const { Option } = Select;
const { Step } = Steps;

interface CreateListingProps {}

const pages = [
  { title: 'General', content: <TextPage /> },
  { title: 'Details', content: <NumberPage /> },
  {
    title: 'More Details',
    content: <AmenitiesPage />,
  },
];

const CreateListing: React.FC<CreateListingProps> = ({}) => {
  useIsAuth();

  const [form] = Form.useForm();
  const [currPage, setCurrPage] = useState(0);

  const nextPage = () => {
    setCurrPage(currPage + 1);
  };

  const prevPage = () => {
    setCurrPage(currPage - 1);
  };

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };

  const handleSubmit = (values: ListingFormProps) => {
    console.log(values);
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
          {({ loading, submit }) => (
            <Form
              {...formItemLayout}
              form={form}
              name='listing'
              initialValues={{
                title: '',
                description: '',
                category: 'home',
                price: 1,
                beds: 1,
                guests: 1,
                latitude: 0,
                longitude: 0,
                amenities: [],
              }}
              onFinish={submit}
              scrollToFirstError
              style={{ width: '100%' }}
            >
              {/* <InputField
          name='title'
          label='Title'
          rules={[
            {
              required: true,
              message: 'Please add a title!',
            },
            {
              max: 50,
              message: 'That is where you need to stop',
            },
          ]}
          placeholder='e.g. Lovely Studio Flat in the Center of the City'
        />
  
        <InputField
          name='description'
          label='Description'
          rules={[
            {
              required: true,
              message: 'Please add a description!',
            },
            {
              max: 255,
              message: 'That is where you need to stop',
            },
          ]}
          placeholder='e.g. details to persuade customers'
        />
  
        <Select
          defaultValue='home'
          style={{ width: 120 }}
          onChange={handleChange}
          allowClear
        >
          <Option value='home'>Home</Option>
          <Option value='apartment'>Apartment</Option>
        </Select>
  
        <InputNumber min={1} max={10000} onChange={handleChange} />
        <InputNumber min={1} max={8} onChange={handleChange} />
        <InputNumber min={1} max={16} onChange={handleChange} />
        <InputNumber min={-90} max={90} onChange={handleChange} />
        <InputNumber min={180} max={180} onChange={handleChange} />
  
        <Select
          mode='tags'
          style={{ width: '100%' }}
          placeholder='Tags Mode'
          onChange={handleChange}
        >
          {children}
        </Select> */}

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
                    <Button type='primary' onClick={nextPage}>
                      Next
                    </Button>
                  )}
                  {currPage === pages.length - 1 && (
                    <Button type='primary' htmlType='submit' loading={loading}>
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

              {/* <Form.Item {...tailFormItemLayout}>
          <Button
            type='primary'
            htmlType='submit'
            //loading={loading}
            style={{ width: '100%' }}
          >
            Create Listing
          </Button>
        </Form.Item> */}
            </Form>
          )}
        </CreateListingController>
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreateListing);
