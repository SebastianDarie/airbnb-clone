import React, {useEffect, useRef, useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Caption, TextInput} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {PaymentSheet, useStripe} from '@stripe/stripe-react-native';
import {ReserveScreenNavigationProp} from '../../navigation/RootNavigation';
import {
  useCreateHeaderMutation,
  useCreateMessageMutation,
  useCreatePaymentIntentMutation,
  useCreateReservationMutation,
} from '@second-gear/controller';
import {styles} from './styles';
import ReservationStore from '../../global-stores/useReservationStore';
import shallow from 'zustand/shallow';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GuestsModal} from '../../components/modal/GuestsModal';

export const ReserveController: React.FC<ReserveScreenNavigationProp> = ({
  route,
}) => {
  const {initPaymentSheet, presentPaymentSheet, confirmPayment} = useStripe();
  const [createHeader] = useCreateHeaderMutation();
  const [createMessage] = useCreateMessageMutation();
  const [
    createPaymentIntent,
    {data: clientSecret},
  ] = useCreatePaymentIntentMutation();
  const [createReservation] = useCreateReservationMutation();
  const [
    startDate,
    endDate,
    adults,
    children,
    infants,
  ] = ReservationStore.useReservationStore(
    state => [
      state.startDate,
      state.endDate,
      state.adults,
      state.children,
      state.infants,
    ],
    shallow,
  );
  const [paymentMethod, setPaymentMethod] = useState<{
    image: string;
    label: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const modalRef = useRef(null);

  const listing = route.params.data?.listing;

  const initializePaymentSheet = async () => {
    await createPaymentIntent({variables: {id: listing!.id, nights: 2}});
    const {error, paymentOption} = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret
        ? clientSecret.createPaymentIntent!
        : '',
      customFlow: true,
      merchantDisplayName: 'Airbnb',
      style: 'alwaysDark',
    });
    setLoading(false);
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    }
    updateButtons(paymentOption);
    console.log('initialize payment', loading, paymentOption);
  };

  useEffect(() => {
    if (listing?.id) {
      initializePaymentSheet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateButtons = (
    paymentOption: PaymentSheet.PaymentOption | undefined,
  ) => {
    if (paymentOption) {
      setPaymentMethod({
        label: paymentOption.label,
        image: paymentOption.image,
      });
    } else {
      setPaymentMethod(null);
    }
  };

  const choosePaymentOption = async () => {
    const {error, paymentOption} = await presentPaymentSheet({
      confirmPayment: false,
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    }
    updateButtons(paymentOption);
  };

  const onPressBuy = async () => {
    setLoading(true);
    const payload = await confirmPayment(clientSecret?.createPaymentIntent!, {
      type: 'Card',
    });

    if (payload.error) {
      Alert.alert(`Error code: ${payload.error.code}`, payload.error.message);
      setLoading(false);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      setLoading(false);
      if (listing) {
        const {data: reservationData} = await createReservation({
          variables: {
            input: {
              arrival: startDate,
              departure: endDate,
              guests: adults + children + infants,
              listingId: listing.id,
              paymentIntent: payload.paymentIntent?.id,
            },
          },
        });

        const {data: headerData} = await createHeader({
          variables: {
            input: {
              listingId: listing.id,
              reservationId: reservationData?.createReservation.id,
              subject: 'Reservation',
              toId: listing.creator.id,
            },
          },
        });

        if (headerData) {
          createMessage({
            variables: {
              input: {
                headerId: headerData.createHeader.id,
                isFromSender: 1,
                text: message,
              },
            },
          });
        }
      }
    }
  };

  const subTotal = (listing?.price || 1) * 2;
  const serviceFee = Math.floor(((listing?.price || 1) / 100) * 17);
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.mainWrapper}>
            <View style={styles.flexDir}>
              <FastImage
                source={{uri: listing?.photos[0]}}
                resizeMode="cover"
                style={styles.coverImg}
              />
              <View>
                <Text style={styles.roomCategory}>
                  Entire {listing?.category} in {listing?.city}
                </Text>
                <Text style={styles.roomTitle}>{listing?.title}</Text>
                <Caption style={styles.captionText}>
                  {listing?.beds} beds · {listing?.bathrooms} baths
                </Caption>
                <FontAwesomeIcon name="star" color="#ff385c" size={12} />
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.flexContainer}>
              <View style={styles.scroll}>
                <Text style={styles.trip}>Your trip</Text>
                <View style={styles.row}>
                  <View>
                    <Text style={styles.miniTitle}>Dates</Text>
                    <Text style={styles.tripDetails}>Sep 19-21</Text>
                  </View>
                  <TouchableOpacity onPress={() => console.log('edit')}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <View>
                    <Text style={styles.miniTitle}>Guests</Text>
                    <Text style={styles.tripDetails}>
                      {adults + children + infants} guests
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => console.log('edit')}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <GuestsModal
              adults={adults}
              children={children}
              infants={infants}
            />

            <View style={styles.divider} />

            <View style={styles.flexContainer}>
              <View style={styles.scroll}>
                <Text style={styles.priceTitle}>Price details</Text>
                <View style={styles.row}>
                  <Text style={styles.tripDetails}>
                    ${listing?.price} x 2 nights
                  </Text>
                  <Text style={styles.tripDetails}>${subTotal}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.tripDetails}>Service fee</Text>
                  <Text style={styles.serviceFee}>${serviceFee}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.finalPrice}>Total(USD)</Text>
                  <Text style={styles.finalPrice}>
                    ${subTotal + serviceFee}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.flexContainer}>
              <View style={styles.scroll}>
                <Text style={styles.messageTitle}>Message the host</Text>
                <View>
                  <Text>
                    Let the host know why you're traveling and when you'll check
                    in
                  </Text>
                  <TextInput
                    multiline
                    mode="outlined"
                    numberOfLines={5}
                    value={message}
                    onChangeText={text => setMessage(text)}
                  />
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.flexPay}>
              <View>
                <Button
                  mode="text"
                  loading={loading && !paymentMethod}
                  style={styles.btn}
                  onPress={choosePaymentOption}>
                  {paymentMethod ? (
                    <View style={styles.row}>
                      <FastImage
                        source={{
                          uri: `data:image/png;base64,${paymentMethod.image}`,
                        }}
                      />
                      <Text>{paymentMethod.label}</Text>
                    </View>
                  ) : (
                    'Choose payment method'
                  )}
                </Button>
              </View>

              <View>
                <Button
                  color="white"
                  mode="outlined"
                  loading={loading}
                  disabled={!paymentMethod}
                  style={styles.stripeBtn}
                  onPress={onPressBuy}>
                  <Text>Request to Book</Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </BottomSheetModalProvider>
  );
};
