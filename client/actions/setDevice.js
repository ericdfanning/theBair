
export const SET_DEVICE = 'set_device';

export function setDevice(isMobile) {

	return {
	  type: SET_DEVICE,
	  payload: isMobile
	}
}