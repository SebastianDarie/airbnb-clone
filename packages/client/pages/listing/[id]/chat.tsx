import { Button, Form } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../components/InputField';
import { useGetMessagesFromUrl } from '../../../shared-hooks/useGetMessagesFromUrl';
import { formItemLayout, tailFormItemLayout } from '../../../styles/formStyles';
import { withApollo } from '../../../utils/withApollo';
import {
  CreateMessageController,
  NewMessageDocument,
} from '@airbnb-clone/controller';
import { useEffect } from 'react';

interface ListingChatProps {}

const ListingChat: React.FC<ListingChatProps> = () => {
  const {
    data,
    error,
    loading,
    variables,
    subscribeToMore,
  } = useGetMessagesFromUrl();

  useEffect(() => {
    const subscribeToNewMessages = () => {
      subscribeToMore({
        document: NewMessageDocument,
        variables,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMsg = subscriptionData.data.messages.filter((msg) =>
            prev.messages.includes(msg)
          );
          return Object.assign({}, prev, {
            messages: [...prev.messages, newMsg],
          });
        },
      });
    };

    subscribeToNewMessages();
  }, []);

  if ((!data && !loading) || error) {
    return (
      <div>
        <div>failed to load listings</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  if (!data && loading) {
    return <div>loading...</div>;
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<{ text: string }>({
    mode: 'onBlur',
    //resolver: yupResolver(loginSchema),
  });

  return (
    <>
      {data && data.messages.map((msg) => <p key={msg.id}>{msg.text}</p>)}

      {variables && (
        <CreateMessageController>
          {({ submit, error, loading }) => (
            <Form
              {...formItemLayout}
              name='message'
              onFinish={handleSubmit((values) =>
                submit({ ...values, listingId: variables.listingId })
              )}
              scrollToFirstError
            >
              <InputField
                control={control}
                errors={errors.text?.message}
                name='message'
                label=''
              />

              <Form.Item {...tailFormItemLayout}>
                <Button
                  type='primary'
                  htmlType='submit'
                  disabled={!isDirty || !isValid}
                  loading={loading || isSubmitting}
                  style={{ width: '100%' }}
                >
                  Send
                </Button>
              </Form.Item>
            </Form>
          )}
        </CreateMessageController>
      )}
    </>
  );
};

export default withApollo({ ssr: false })(ListingChat);
