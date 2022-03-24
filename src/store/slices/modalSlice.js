const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

const initState = {
  open: false,
  title: '',
  content: null,
  onOk: '',
  onCance: '',
  onClose: ''
};

export default function modalReducer(state = initState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      const { content, title, onOK, onCancel, onClose } = action.payload;
      return {
        open: true,
        title,
        content,
        onOK,
        onClose,
        onCancel
      };
    }
    case CLOSE_MODAL: {
      return { ...initState };
    }
    default:
      return state;
  }
}

export const openModal = (info) => ({
  type: OPEN_MODAL,
  payload: info
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
