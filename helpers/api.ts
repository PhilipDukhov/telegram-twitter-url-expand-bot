// TODO: Re-enable Redis by removing this stub and uncommenting the Redis implementation below.
// import { getRedisClient } from "./redis";
// const redis = getRedisClient();

export interface ChatSettings {
  autoexpand: boolean;
  changelog: boolean;
  chat_size: number;
  ignore_permissions_warning: boolean;
  settings_lock: boolean;
}

const DEFAULT_SETTINGS: ChatSettings = {
  autoexpand: true,
  changelog: true,
  chat_size: 0,
  ignore_permissions_warning: false,
  settings_lock: false,
};

export const getSettings = async (_chatId: number): Promise<ChatSettings> => DEFAULT_SETTINGS;

export const createSettings = async (
  _chatId: number,
  _autoexpandValue: boolean,
  _changelogValue: boolean,
  _settingsLockValue: boolean
): Promise<ChatSettings> => DEFAULT_SETTINGS;

export const updateSettings = async (
  _id: number,
  _property: keyof ChatSettings,
  _value: ChatSettings[keyof ChatSettings]
): Promise<ChatSettings> => DEFAULT_SETTINGS;
