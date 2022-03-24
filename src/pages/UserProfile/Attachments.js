import * as React from 'react';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { format } from 'date-fns-jalali';
import { useTranslation } from 'react-i18next';

import Actions from '../../components/profile/Actions';
import ImageEx from '../../components/ImageEx';
import ImagePreview from '../../components/ImagePreview';

Attachments.propTypes = {
  attachments: PropTypes.array,
  userStatus: PropTypes.string
};

const ImageRow = styled('div')(({ theme }) => ({
  display: 'flex',
  maxHeight: '100px',
  flexFlow: 'row',

  padding: theme.spacing(2),
  margin: theme.spacing(2),
  border: '1px solid gray',
  borderRadius: '5px'
}));

const ImageInfo = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexFlow: 'column',
  padding: '0px 10px'
}));

export default function Attachments({ userStatus, attachments }) {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = React.useState();

  const handleShowImage = (id, type) => {
    setSelectedImage({ id, type });
  };

  return (
    <>
      <Card>
        {attachments &&
          attachments
            .sort((a, b) => Date.parse(b.create_date) - Date.parse(a.create_date))
            .filter((c) => c.type === 'nat_card')
            .map((item, index) => (
              <ImageRow key={item.id}>
                <ImageEx
                  type={item.type}
                  id={item.id}
                  style={{ width: '100px', cursor: 'pointer' }}
                  onClick={() => handleShowImage(item.id, item.type)}
                />
                <ImageInfo>
                  <Stack>
                    {t('SendingDate')} :{' '}
                    {format(Date.parse(item.create_date), 'hh:mm:ss yyyy/MM/dd')}
                  </Stack>
                  <Stack style={{ color: index !== 0 ? 'red' : '' }}>
                    {index > 0 || userStatus === 'profile_rejected'
                      ? t('Rejected')
                      : t(userStatus === 'profile_submitted' ? 'Pending' : 'Approved')}
                  </Stack>
                </ImageInfo>
              </ImageRow>
            ))}
      </Card>
      {selectedImage && <ImagePreview {...selectedImage} onClose={() => setSelectedImage()} />}
      <Actions returnButton />
    </>
  );
}
