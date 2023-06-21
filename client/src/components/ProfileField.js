import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

export const ProfileField = ({ value }) => {
  return (
    <Stack className="mb-3" direction="horizontal" gap={2}>
      {value.map((i, index) => <Badge pill bg="secondary" key={index}>{i}</Badge>)}
    </Stack>
  );
};