import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import map from '@iconify/icons-eva/map-fill';
import { useTranslation } from 'react-i18next';
import { Badge } from '@mui/material';

// ----------------------------------------------------------------------

const getIcon = (name, badgeValue) => {
  const icon = <Icon icon={name} width={22} height={22} />;
  return badgeValue > 0 ? (
    <Badge badgeContent={badgeValue} color="error">
      {icon}
    </Badge>
  ) : (
    icon
  );
};

function useSidebarConfig() {
  const { t } = useTranslation();

  const sidebarConfig = [
    {
      title: t('ManageClasses'),
      path: '/dashboard/classes',
      icon: getIcon(pieChart2Fill)
    },
    {
      title: t('ManageMentors'),
      path: '/dashboard/mentors',
      icon: getIcon(map)
    }
  ];

  return sidebarConfig;
}

export default useSidebarConfig;
