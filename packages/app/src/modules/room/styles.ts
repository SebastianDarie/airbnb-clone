import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

export const styles = StyleSheet.create({
  amenitiesTitle: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: '700',
  },

  btnContainer: {
    backgroundColor: '#ff385c',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 45,
    width: '45%',
  },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  contentContainer: {
    paddingHorizontal: 16,
    overflow: 'visible',
  },

  city: {
    color: Colors.grey500,
  },

  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: Colors.grey500,
  },

  icon: {color: '#ff385c', marginTop: 2, marginRight: 5},

  iconsFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    marginRight: 16,
  },

  mainWrapper: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  map: {
    height: 200,
    marginTop: 15,
  },

  overlayBtn: {
    zIndex: 100,
  },

  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  night: {
    fontSize: 16,
  },

  reserve: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.grey200,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  reserveBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  reserveText: {
    color: Colors.white,
    fontSize: 16,
  },

  reserveRating: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  reviewsMargin: {
    marginLeft: 20,
  },

  roomTitle: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: 'bold',
  },

  scrollContainer: {
    flex: 1,
  },

  scrollViewContainer: {
    flex: 1,
    overflow: 'visible',
  },

  section: {
    paddingVertical: 18,
  },

  showMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  showMore: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  subheading: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 15,
  },
});
