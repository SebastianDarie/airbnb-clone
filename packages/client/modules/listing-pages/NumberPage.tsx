import { InputField } from '../../components/InputField';

interface NumberPageProps {}

export const NumberPage: React.FC<NumberPageProps> = ({}) => {
  return (
    <>
      <InputField number name='price' label='Price' min={1} max={10000} />
      <InputField number name='beds' label='Beds' min={1} max={8} />
      <InputField number name='guests' label='Guests' min={1} max={16} />
    </>
  );
};
