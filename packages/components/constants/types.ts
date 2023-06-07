import { SubAppEnum, SubAppPathEnum } from './index';

export interface CommonModuleConfigType {
  CURRENT_PLATFORM: keyof typeof SubAppEnum;
  CURRENT_PLATFORM_PATH: SubAppPathEnum;
}