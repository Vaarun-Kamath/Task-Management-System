import { StatusList } from '@/constants/TaskStatus';

export function getColour(priority: number) {
  if (priority < 10) {
    return 'green';
  } else if (priority < 20) {
    return 'orange';
  }
  return 'red';
}
export function getColourStatus(status: string) {
  if (status == StatusList[StatusList.length - 1]) {
    return 'green';
  }
  return 'gray';
}

export function timeInSec(tim: string) {
  return new Date(tim).getTime();
}
