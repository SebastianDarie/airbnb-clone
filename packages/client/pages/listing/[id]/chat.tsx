import { Button, Form, Layout } from 'antd';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../components/InputField';
import { useGetMessagesFromUrl } from '../../../shared-hooks/useGetMessagesFromUrl';
import { formItemLayout, tailFormItemLayout } from '../../../styles/formStyles';
import { withApollo } from '../../../utils/withApollo';
import {
  CreateMessageController,
  NewMessageDocument,
  useIsAuth,
  useNewMessageSubscription,
} from '@airbnb-clone/controller';

interface ListingChatProps {}

const ListingChat: React.FC<ListingChatProps> = () => {
  useIsAuth();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<{ text: string }>({
    mode: 'onBlur',
    //resolver: yupResolver(loginSchema),
  });

  const {
    data,
    error,
    loading,
    variables,
    subscribeToMore,
  } = useGetMessagesFromUrl();
  console.log(data, error);

  // useEffect(() => {
  //   const subscribeToNewMessages = () => {
  //     subscribeToMore({
  //       document: NewMessageDocument,
  //       variables,
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
  //         const newMsg = subscriptionData.data.messages.filter((msg) =>
  //           prev.messages.includes(msg)
  //         );
  //         return Object.assign({}, prev, {
  //           messages: [...prev.messages, newMsg],
  //         });
  //       },
  //     });
  //   };

  //   subscribeToNewMessages();
  // }, []);

  if ((!data && !loading) || error) {
    return (
      <div>
        <div>failed to load messages</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  if (!data && loading) {
    return <div>loading...</div>;
  }

  let unsubscribe: () => void;

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

  return (
    <Layout>
      <Layout.Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        {data && data.messages.map((msg) => <p key={msg.id}>{msg.text}</p>)}

        {variables && (
          <CreateMessageController>
            {({ submit, loading }) => {
              if (!unsubscribe) {
                unsubscribe = subscribeToNewMessages;
              }

              return (
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
                    name='text'
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
                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      type='ghost'
                      loading={loading || isSubmitting}
                      style={{ width: '100%' }}
                      onClick={unsubscribe}
                    >
                      Unsubscribe
                    </Button>
                  </Form.Item>
                </Form>
              );
            }}
          </CreateMessageController>
        )}
      </Layout.Content>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ListingChat);
