import moment from 'moment';

const validateEventRange = (start, end, eventDuration) => {
  return start < end && end - start <= eventDuration;
}