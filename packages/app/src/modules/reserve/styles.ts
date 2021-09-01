import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  scroll: {
    flex: 1,
  },

  mainWrapper: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 20,
  },

  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },

  flexDir: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingVertical: 20,
  },

  flexPay: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  coverImg: {
    borderRadius: 8,
    marginRight: 20,
    height: 105,
    width: '30%',
  },

  captionText: {
    fontSize: 12,
    marginBottom: 10,
  },

  roomCategory: {
    fontSize: 12,
  },

  roomTitle: {
    fontSize: 18,
  },

  divider: {
    flex: 1,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 7,
    margin: 0,
    width: '100%',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  trip: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  miniTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  tripDetails: {
    color: '#808080',
    fontSize: 15,
    marginBottom: 15,
  },

  editText: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  serviceFee: {
    color: 'green',
    fontSize: 15,
    marginBottom: 15,
  },

  priceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  finalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  messageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  btn: {
    marginTop: 20,
    marginBottom: 10,
  },

  stripeBtn: {
    alignSelf: 'center',
    backgroundColor: '#ff385c',
    borderRadius: 7,
    marginTop: 20,
    paddingVertical: 5,
    width: '90%',
  },
});
