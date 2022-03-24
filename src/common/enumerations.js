import { i18n } from '../App';

export const enums = {
  feedbackStatus: {
    1: 'pending',
    2: 'inProgress',
    3: 'done'
  },
  maintenanceStatus: {
    1: 'pending',
    2: 'inProgress',
    3: 'done',
    4: 'cancel'
  },
  maintenanceType: {
    1: 'feedback',
    2: 'vehicleReport',
    3: 'movingLockedVehicle',
    4: 'locationOutOfPattern',
    5: 'locationOutOfRange',
    6: 'unbalanceVehicle',
    7: 'batteryIssue',
    8: 'stationArrangement',
    9: 'vehicleSuspicious'
  },
  assetType: {
    1: 'vehicle',
    2: 'sim',
    3: 'iot',
    4: 'helmet',
    5: 'battery',
    6: 'charger',
    7: 'lock',
    8: 'box'
  },
  userStatus: {
    1: 'new_user',
    2: 'new_user_verified',
    3: 'inquiry_submitted',
    4: 'inquiry_verified',
    5: 'profile_submitted',
    6: 'profile_rejected',
    7: 'active',
    9: 'ban'
  },
  permissionCodes: {
    1: 'LoginToBackoffice',
    2: 'ViewMapStatus',
    3: 'ManageAssets',
    4: 'ManageApplicationUsers',
    5: 'ManageSystemUsers',
    6: 'NationalCards',
    7: 'EndTripImages',
    8: 'ManageFeedbacks',
    9: 'SystemSettings',
    10: 'OperationUnit',
    11: 'ViewDashboard'
  }
};

export function getEnumItems(name) {
  return Object.keys(enums[name]).map((key) => ({
    title: i18n.t(enums[name][key]),
    value: key
  }));
}

export function getEnumString(name, value) {
  return i18n.t(enums[name][value]);
}
