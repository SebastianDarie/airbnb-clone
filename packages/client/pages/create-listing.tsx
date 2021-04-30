import Link from 'next/link';
import { ListingFormProps, useIsAuth } from '@airbnb-clone/controller';
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

const handleChange = (value: any) => {
  console.log(`selected ${value}`);
};

const pages = [
  { title: 'General', content: <TextPage handleChange={handleChange} /> },
  { title: 'Details', content: <NumberPage handleChange={handleChange} /> },
  {
    title: 'More Details',
    content: <AmenitiesPage handleChange={handleChange} />,
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

  // const handleChange = (value: any) => {
  //   console.log(`selected ${value}`);
  // };

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
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <Form
          {...formItemLayout}
          form={form}
          name='login'
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          scrollToFirstError
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

          <Steps current={currPage}>
            {pages.map((page) => (
              <Step key={page.title} title={page.title} />
            ))}
          </Steps>
          <>{pages[currPage].content}</>

          <Form.Item>
            {currPage < pages.length - 1 && (
              <Button
                type='primary'
                style={{ width: '100%' }}
                onClick={nextPage}
              >
                Next
              </Button>
            )}
            {currPage === pages.length - 1 && (
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%' }}
              >
                Create Listing
              </Button>
            )}
            {currPage > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={prevPage}>
                Previous
              </Button>
            )}
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
      </Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreateListing);
