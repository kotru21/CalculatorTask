/**
 * Создание дефолтной пользовательской темы
 */
import { lightTheme } from '../themes/lightTheme';

/**
 * Шаблон для создания новой пользовательской темы
 */
export const defaultCustomTheme = {
  id: 'custom_new',
  name: 'Новая тема',
  isCustom: true,
  variables: { ...lightTheme.variables },
};
