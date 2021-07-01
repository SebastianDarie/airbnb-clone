import React from 'react';

interface FloorPlanDetailsProps {
  bathrooms: number;
  bedrooms: number;
  beds: number;
  guests: number;
}

export const FloorPlanDetails: React.FC<FloorPlanDetailsProps> = ({
  bathrooms,
  bedrooms,
  beds,
  guests,
}) => {
  return (
    <>
      <span>{guests} guests</span>
      <span> · </span>
      <span>{bedrooms} bedrooms</span>
      <span> · </span>
      <span>{beds} beds</span>
      <span> · </span>
      <span>{bathrooms} baths</span>
    </>
  );
};
