import { Logger } from '@cooperl/logger';
import { authenticationConfigs, initAuthenticationConfigs } from './authentication.configs';

jest.mock('@cooperl/logger');
global.fetch = jest.fn();

describe('initAuthenticationConfigs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockReset();
  });

  describe('Success', () => {
    it('should fetch the authentication manifest and set it in authenticationConfigs', async () => {
      const mockResponse = { key: 'value' };
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      await initAuthenticationConfigs();

      expect(global.fetch).toHaveBeenCalledWith('/authentication.manifest.json');
      expect(authenticationConfigs).toEqual(mockResponse);
    });

    it('should freeze the authenticationConfigs object', async () => {
      const mockResponse = { key: 'value' };
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      await initAuthenticationConfigs();

      expect(Object.isFrozen(authenticationConfigs)).toBe(true);
    });
  });

  describe('Failure', () => {
    it('should log an error and use default values if fetching the manifest fails', async () => {
      const mockError = new Error('Failed to fetch');
      (global.fetch as jest.Mock).mockRejectedValue(mockError);
      const loggerErrorSpy = jest.spyOn(Logger.prototype, 'error');

      await initAuthenticationConfigs();

      expect(global.fetch).toHaveBeenCalledWith('/authentication.manifest.json');
      expect(loggerErrorSpy).toHaveBeenCalledWith('Failed to fetch authentication manifest, taking default values');
      expect(authenticationConfigs).toStrictEqual({});
    });

    it('should freeze the authenticationConfigs object', async () => {
      const mockError = new Error('Failed to fetch');
      (global.fetch as jest.Mock).mockRejectedValue(mockError);

      await initAuthenticationConfigs();

      expect(Object.isFrozen(authenticationConfigs)).toBe(true);
    });
  });
});
